import ExcelJS from "exceljs";
import fs from "fs/promises";

const worksheetNameToConvert = "articles_new";

const inputFilePath = "src/scripts/xslx/TBD_DB.xlsx";
const outputFilePath = `src/lib/${worksheetNameToConvert}.json`;

const convertRichTextToHTML = (richText) => {
  return richText
    .map((part) => {
      let text = part.text;
      if (part.font) {
        if (part.font.bold) text = `<b>${text}</b>`;
        if (part.font.italic) text = `<i>${text}</i>`;
        if (part.font.underline) text = `<u>${text}</u>`;
      }
      return text;
    })
    .join("")
    .replace(/\n/g, "<br>");
};

(async () => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(inputFilePath);

    const worksheet = workbook.getWorksheet(worksheetNameToConvert);

    if (!worksheet) {
      throw new Error(
        `Worksheet '${worksheetNameToConvert}' not found in the Excel file.`
      );
    }

    const headers = [];
    worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
      headers[colNumber] = cell.value;
    });

    const data = [];

    const setNestedValue = (obj, path, value) => {
      const keys = path.split("/");
      let current = obj;
      while (keys.length > 1) {
        const key = keys.shift();
        if (!current[key]) {
          current[key] = {};
        }
        current = current[key];
      }
      current[keys[0]] = value;
    };

    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      if (rowNumber === 1) return;

      const rowData = {};

      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        const header = headers[colNumber];
        if (header) {
          let cellValue = cell.value;

          if (
            cellValue &&
            typeof cellValue === "object" &&
            cellValue.richText
          ) {
            cellValue = convertRichTextToHTML(cellValue.richText);
          } else if (cellValue === null || cellValue === undefined) {
            cellValue = "";
          } else if (cell.formula) {
            cellValue = cell.result;
          } else if (typeof cellValue === "string") {
            cellValue = cellValue.replace(/\n/g, "<br><br>");
          }

          setNestedValue(rowData, header, cellValue);
        }
      });

      data.push(rowData);
    });

    await fs.writeFile(outputFilePath, JSON.stringify(data, null, 2));
    //console.log(`Conversion completed. JSON data written to ${outputFilePath}`);
  } catch (error) {
    console.error("Error:", error);
  }
})();

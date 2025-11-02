<script>
    const footerImg = '/IDENTITY_IMAGES/FOOTERTEXT.svg';
    const mailchimpActionUrl = "https://polimi.us21.list-manage.com/subscribe/post?u=2088942308759df62fadb3c02&id=8b4532ecd0&f_id=00b7ece6f0";

    function loadMailchimpScript() {
        const script = document.createElement('script');
        script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
        script.onload = () => {
        };
        document.body.appendChild(script);
    }

    import { onMount } from 'svelte';
    onMount(() => {
        loadMailchimpScript();
    });

</script>

<footer>
    <div class="footer_high">
        <img src={footerImg} alt="Footer Text">
    </div>
    <section>
        <div class="footer_button_container">
            <a class="button" href="https://www.instagram.com/tbd.ultramagazine/">
                <p class="p2">INSTAGRAM</p>
            </a>
            <a class="button" href="https://www.facebook.com/TBDultramagazine/">
                <p class="p2">FACEBOOK</p>
            </a>
        </div>

        <div class="newsletter_container">
            <div id="mc_embed_signup">
                <form action={mailchimpActionUrl} method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
                    <div id="mc_embed_signup_scroll">
                        <h3>Subscribe to the newsletter</h3>
                        <div class="mc-field-group">
                            <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required={true} placeholder="Your Email address here">
                        </div>
                        <div id="mce-responses" class="clear">
                            <div class="response" id="mce-error-response" style="display:none;"></div>
                            <div class="response" id="mce-success-response" style="display:none;"></div>
                        </div>
                        <div style="position: absolute; left: -5000px;" aria-hidden="true">
                            <input type="text" name="b_2088942308759df62fadb3c02_8b4532ecd0" tabindex="-1" value="">
                        </div>
                        <div class="clear">
                            <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button" style="color: var(--white-blue);">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</footer>

<style>
    #mc_embed_signup_scroll {
        display: flex;
        flex-direction: column;
        row-gap: 5px   ;
    } 

    #mc_embed_signup > :nth-child(2) {
        margin: 0px 0px 0px 0px;
    }


footer {
  border-style: solid;
  border-width: 1px 0px 0px 0px;
  border-color: var(--white-blue);
  padding-top: var(--spacing-m);
  padding-bottom: var(--spacing-s);

  width: 100%;
  height: fit-content;

  color: var(--white-blue);
  display: flex;
  flex-direction: column;
  row-gap: 0px;

  z-index: 50;
  background-color: var(--black-blue);
}


footer section {
  width: auto;
  padding-top: 0;
  padding-left: var(--spacing-l);
  padding-right: var(--spacing-l);
  margin-bottom: var(--spacing-l);
  margin-top: var(--spacing-m);
  display: flex;
  flex: 1;
  justify-content: space-between;
}

.footer_button_container {
  width: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  padding: var(--spacing_zero);
}



.newsletter_container {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-s);
  grid-column: span 6;
  overflow: hidden;
  padding: 0px;

  font-family: Helvetica;
}

.newsletter_container > .p1 {
  color: var(--white-white);
  align-self: center;
  text-transform: uppercase;
}

.newsletter_container > #mc_embed_signup {
  background-color: transparent;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: var(--spacing-m);
}

.newsletter_container > #mc_embed_signup > form {
  background-color: transparent;
  display: flex;
  flex-direction: row;
  gap: var(--spacing-s);
  margin: 0px;
  align-items: center;
}

#mce-EMAIL {
  width: 100%;
  height: 30px;
}

.mc-field-group {
  width: 100%;
  margin: 0px;
  padding: 0px;
}

.footer_high {
  width: 100%;
  height: auto;
}

.footer_high > img {
  width: 100%;
  height: auto;
}

.s-scHqDo4uKJDU {
  color: var(--white-white);
}

@media screen and (max-width: 480px) {
  .newsletter_container {
    overflow: hidden;
    padding: var(--spacing-s);
    width: 100%;
  }

  footer {
    border-style: solid;
    border-width: 1px 0px 0px 0px;
    border-color: var(--white-blue);
    padding-top: var(--spacing-xs);
    padding-bottom: var(--spacing-s);

    width: 100%;
    height: fit-content;

    display: flex;
    flex-direction: column;
    row-gap: 0px;
  }

  footer section {
    width: auto;
    padding-left: var(--spacing-m);
    padding-right: var(--spacing-m);
    margin-bottom: var(--spacing-m);
    padding: 0px;
    justify-content: center;
  }

  .footer_button_container {
    width: fit-content;
    display: none;
    flex-direction: column;
    row-gap: 15px;
    padding: var(--spacing_zero);
  }

  .footer_text_container {
    width: fit-content;
    display: flex;
    flex-direction: column;
    row-gap: 2px;
    padding: var(--Spacing_Zero);
  }
}
</style>

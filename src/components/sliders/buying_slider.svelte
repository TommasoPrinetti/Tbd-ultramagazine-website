<script lang="ts">
    import { tick } from 'svelte';
    import { headerHeight } from '$lib/store';
  
    let { 
        issueData,
        isSliderOpen = $bindable(false),
    } = $props();

    const spedTracciata = 7
    
    let globalCost = $derived((issueData?.issuePrice || 0) + spedTracciata);
    let paypalButtonContainer = $state<HTMLDivElement | null>(null);
    let paypalButtonsInstance: any = null;
    let isInitialized = $state(false);
    let currentIssuePrice = $state<string | number | undefined>(undefined);
  
    function closeSlider() {
      isSliderOpen = false;
    }
  
    async function loadPaypalSdk() {
      if (!window.paypal) {
        const script = document.createElement('script');
        script.src = 'https://www.paypal.com/sdk/js?client-id=AcB7uWSJdzRWxye8YgzdDEOPAiX8ser0PljQTiJNpSH3yOS-jKom4cj9IfABUDBavkQvSHXFbPjRoqDg&enable-funding=venmo&currency=EUR';
        document.body.appendChild(script);
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
        });
      }
    }
  
    async function initPayPalButton() {
      // Wait for the element to exist
      if (!paypalButtonContainer) {
        await tick();
        paypalButtonContainer = document.getElementById('paypal-button-container') as HTMLDivElement;
      }

      // Check if element exists and PayPal SDK is loaded
      if (!paypalButtonContainer) {
        console.warn('PayPal button container not found');
        return;
      }

      if (!window.paypal) {
        console.error('PayPal SDK not loaded!');
        return;
      }

      // Clear any existing PayPal buttons
      if (paypalButtonContainer.children.length > 0) {
        paypalButtonContainer.innerHTML = '';
      }

      // Initialize PayPal buttons
      try {
        paypalButtonsInstance = window.paypal.Buttons({
          style: {
            shape: 'pill',
            color: 'black',
            layout: 'vertical',
            label: 'buynow',
          },
          createOrder: function(data: any, actions: any) {
            const selectedItemDescription = `TBD Magazine - Issue ${issueData?.issueTitle} - SPED. GRATUITA`;
            const selectedItemPrice = issueData?.issuePrice;
            const shipping = 0;
            const tax = 0;
            const quantity = 1;
  
            return actions.order.create({
              purchase_units: [{
                description: selectedItemDescription,
                amount: {
                  currency_code: 'EUR',
                  value: selectedItemPrice,
                  breakdown: {
                    item_total: {
                      currency_code: 'EUR',
                      value: selectedItemPrice,
                    },
                    shipping: {
                      currency_code: 'EUR',
                      value: shipping,
                    },
                    tax_total: {
                      currency_code: 'EUR',
                      value: tax,
                    }
                  }
                },
                items: [{
                  name: selectedItemDescription,
                  unit_amount: {
                    currency_code: 'EUR',
                    value: selectedItemPrice,
                  },
                  quantity: quantity
                }]
              }]
            });
          },
          onApprove: function(data: any, actions: any) {
            return actions.order.capture().then(function(orderData: any) {
              if (paypalButtonContainer) {
                paypalButtonContainer.innerHTML = '<h3>Thank you for your purchase!</h3>';
              }
            });
          },
          onError: function(err: any) {
            console.error('PayPal Button Error:', err);
          },
        });
        
        paypalButtonsInstance.render(paypalButtonContainer);
        isInitialized = true;
        currentIssuePrice = issueData?.issuePrice;
      } catch (error) {
        console.error('Error rendering PayPal buttons:', error);
      }
    }

    // Watch for when issueData becomes available and initialize PayPal
    $effect(() => {
      if (issueData?.issuePrice && paypalButtonContainer && !isInitialized) {
        loadPaypalSdk().then(async () => {
          await tick(); // Wait for DOM to update
          await initPayPalButton();
        });
      }
    });

    // Re-initialize when issueData.issuePrice changes
    $effect(() => {
      if (issueData?.issuePrice && paypalButtonContainer && currentIssuePrice !== undefined && currentIssuePrice !== issueData?.issuePrice) {
        // Reset initialization flag when issue changes
        isInitialized = false;
        loadPaypalSdk().then(async () => {
          await tick();
          await initPayPalButton();
        });
      }
    });
  </script>

{#if issueData?.issuePrice}
    <div class="buying_slider vertical_flex {isSliderOpen ? 'open' : ''}" id={issueData?.issueTitle} style="margin-top: {$headerHeight}px;">
      {#key issueData?.issuePrice}
      <button class="exit_slider" onclick={closeSlider} ontouchend={closeSlider} aria-label="Close slider" aria-roledescription="Close slider" tabindex="0">
        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="26" viewBox="0 0 27 26" fill="none">
            <path d="M2 1.5L25 24.5" stroke-width="3" stroke-linecap="round"/>
            <path d="M25 1.5L2 24.5" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </button>
      {/key}
        

        <img src={issueData?.issueCover} alt={issueData?.issueTitle}>

        <div class="paypal_button" id={issueData?.issueTitle}>
            <div id="smart-button-container" class="paypal_button_container">
                <div style="text-align: center;">
                    <div class="Title_drop_container">
                        <p class="p1">PRE ORDER ISSUE {issueData?.issueTitle}</p>
                    <select id="item-options">
                        <option value="{issueData?.issueTitle} - SPED. GRATUITA" data-price={issueData?.issuePrice}>SPED. GRATUITA - {issueData?.issuePrice} EUR</option>
                        <option value="{issueData?.issueTitle} - SPED. ESPRESSA (TRACCIATA)" data-price={globalCost}>SPED. ESPRESSA (TRACCIATA) - {globalCost} EUR</option>
                    </select>
                    <select style="visibility: hidden" id="quantitySelect">

                    </select>   
                </div>

                <div id="paypal-button-container" bind:this={paypalButtonContainer}>
                </div>
                
            </div>
                <div style="height: var(--spacing-xl);">   
                </div>
                <div style="height: var(--spacing-xl);">   
                </div>
            </div>
            
        </div>
    </div>
{/if}

<style>

:global(.paypal) {
  display: block;
  width: 100%;
  height: fit-content;
}

:global(.paypal_button_container) {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Title_drop_container {
  display: flex;
  flex-direction: column;
  row-gap: var(--spacing-xs);
}

.exit_slider {
  position: absolute;
  top: var(--spacing-m);
  right: var(--spacing-m);
  stroke: var(--white-blue);
  opacity: 100%;
}

:global(option) {
  font-family: Arial, Helvetica, sans-serif;
}

.exit_slider:hover {
  position: absolute;
  top: var(--spacing-m);
  right: var(--spacing-m);
  stroke: var(--white-blue);

  opacity: 50%;
}

.buying_slider {
  position: fixed;
  top: 0;
  right: 0;
  bottom: auto;
  width: fit-content;
  height: 100vh;
  overflow-y: scroll;

  padding: var(--spacing-l);
  background-color: var(--black-white);
  border-left: 1px solid var(--white-blue);
  align-items: center;
  justify-content: center;
  row-gap: var(--spacing-m);
  transform: translateX(100%);
  transition: transform 1s ease-in-out;
  z-index: 500;
}

.buying_slider.open {
  right: 0;

  transform: translateX(0%);

  overflow: scroll;
  transition: transform 1s ease-in-out;

  z-index: 500;
}

.buying_slider img {
  width: 300px;
  height: 200px;
  object-fit: contain;
  aspect-ratio: 2/3;
}

@media screen and (max-width: 480px) {
  .buying_slider {

:global(#paypal-button-container) {
  width: 100%;
  height: fit-content;
}

    padding-top: var(--spacing-m);
    width: 100%;
    height: 100%;
    justify-content: flex-start;
  }

  .exit_slider {
    position: absolute;
    right: 0;
    right: var(--spacing-m);
    stroke: var(--white-blue);
    opacity: 100%;
  }


}
</style>
    
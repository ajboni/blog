---
title: Wordpress / Woocommerce - Hide Shipping Fields and address selector for Local Pickup in Cart Page
slug: 2020-05-04-woocommerce-hide-shipping-fields-forlocal-pickup-in-cart-page
date_published: 2020-05-04
date_updated: 2020-05-04
tags:
  - Wordpress
  - Woocommerce
---

Unfortunately Wordpress/Woocommerce does not handle this, resulting in poor UX

<!-- more -->

The solution is to add the following snippet in your child theme function.php

gist: https://gist.github.com/ajboni/8fcfb17ad75f70f7522978bd27f8ed04

```php


/**
 * @snippet       Hide Shipping Fields and address selector for Local Pickup in Cart Page
 * @author        Alexis Boni
 * @testedwith    WooCommerce 5.4 - OceanWP theme.
 */

do_action('woocommerce_after_shipping_rate', $method, $index);
    // define the woocommerce_after_shipping_rate callback
    function action_woocommerce_after_shipping_rate($method, $index)
    {
        // make action magic happen here...
        ?>
			<script type="text/javascript">
				jQuery(document).ready(function($){

					// Class names might change depending on your theme.
					var val = jQuery("input[name='shipping_method[0]']:checked").val()
					if (val.match("^local_pickup")) {
						jQuery('.woocommerce-shipping-destination, .woocommerce-shipping-calculator').fadeOut();
					} else {
						jQuery('.woocommerce-shipping-destination, .woocommerce-shipping-calculator').fadeIn();
					}
				});
   		</script>
		<?php
    };

  // add the action
  add_action('woocommerce_after_shipping_rate', 'action_woocommerce_after_shipping_rate', 10, 2);

```

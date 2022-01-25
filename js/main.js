/* Navbar toggler */
const toggleBtn = document.querySelector(".navbar-toggler");
const navbarNav = document.querySelector(".navbar-nav");
const navCloseBtn = document.querySelector(".btn-nav-close");

toggleBtn.addEventListener("click", () => {
	navbarNav.classList.toggle("active");
});
navCloseBtn.addEventListener("click", () => {
	navbarNav.classList.remove("active");
});

/* Search popup */
const searchBtn = document.querySelector(".btn-search");
const searchBtnClose = document.querySelector(".btn-search-close");
const searchPopup = document.querySelector(".search-popup");

searchBtn.addEventListener("click", () => {
	searchPopup.classList.toggle("active");
});
searchBtnClose.addEventListener("click", () => {
	searchPopup.classList.remove("active");
});

/* Add icon on .nav-item if dropdown exists */
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
	const hasDropdowns = item.querySelector(".dropdown") !== null;
	if (hasDropdowns) {
		item.classList.add("icon");
	}
});


// forms

(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!')
        return;
      }
     

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error)
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  function php_email_form_submit(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    .then(response => {
      if( response.ok ) {
        return response.text()
      } else {
        throw "Thank you! Your message has been successfully sent. We will contact you very soon!"; 
       
      }
    })
    .then(data => {
      thisForm.reset();  
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.trim() == 'OK') {
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        
        thisForm.reset(); 
        throw " Thank you! Your message has been successfully sent. We will contact you very soon!";  
         
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  

})();
"use strict";


(function () {

    /**
     *this method save the data to localstorage
     *
     * @param {any[]} contactList
     */
    function SaveContactListData(contactList: any[]) {
        let count = 0
        for (const contact of contactList) {
            let newContact = new Contact(contact.FullName, contact.ContactNumber, contact.EmailAddress);
            localStorage.setItem(count.toString(), newContact.toJSON());
            count++;

        }

    }

    /**
     *this method reads our data to localstorage and return contact array
     *
     * @return {*}  {Contact[]}
     */
    function LoadContactListData(): Contact[] {
        // create an empty Contatc Arrya Container
        let ContactArray = new Array<Contact>();
        let keys = Object.keys(localStorage);
        for (let key of keys) {
            let newContact = new Contact();
            newContact.fromJSON(localStorage.getItem(key));
            ContactArray.push(newContact);

        }
        return ContactArray;

    }
    // 1st way of using function


/**
 *this method load the header content
 *
 */
function LoadHeader(): void {
    console.log("loading Header");
        $.get("./Views/components/header.html", function (html_data) {
            // loading page using js
            // document.getElementsByTagName("header")[0].innerHTML=html_data;

            // loading page using jquery
            $("header").html(html_data);
            // activate the home link on innitial load
            $("li>a#Home").addClass("active");


            $("li>a").on("click", function (event) {
                event.preventDefault();
                // this section is for changing title
                document.title = $(this).prop("id") as string;


                // this section is for changing URL
                history.pushState({}, "", "/" + document.title);

                // reset all links
                $("li>a").each(function () {
                    $(this).removeClass("active")
                });


                // activate the current link
                $("li>a#" + document.title).addClass("active");
                LoadContent();

            });





            // $("#homePage").addClass("active");

            // switch (document.title) {
            //     case "Home":
            //         $("#homePage").addClass("active");
            //         break;
            //     case "About Us":
            //         $("#aboutPage").addClass("active");
            //         break;
            //     case "Our Projects":
            //         $("#projectPage").addClass("active");
            //         break;
            //     case "Our Services":
            //         $("#servicesPage").addClass("active");
            //         break;
            //     case "Contact Us":
            //         $("#contactPage").addClass("active");
            //         break;
            // }


        });
    }

    /**
 *this method load the main content
 *
 */

    function LoadContent(): void {
        console.log("loading Content");
        let contentLink=document.title.toLowerCase()

        $.get("./Views/content/" +contentLink +".html" , function (html_data) 
        { 
            $("main").html(html_data);
        });



    }

    /**
 *this method load the footer content
 *
 */
    function LoadFooter(): void {
        console.log("loading Footer");
        $.get("./Views/components/footer.html", function (html_data) {
            // loading page using js
            // document.getElementsByTagName("footer")[0].innerHTML=html_data;

            // loading page using jquery
            $("footer").html(html_data)
        })
    }
    function Start() {
        console.log("App Started")
        // initial load
        document.title = 'Home';
        // this section is for changing URL
        history.pushState({}, "", "/Home");
        LoadContent();

        LoadHeader();

        LoadFooter();



    }


    window.addEventListener("load", Start);
})();



// (function()
// {
//  function start()
//  {
//      console.log("App Started")
//  }
//  window.addEventListener("load",start);
// })();
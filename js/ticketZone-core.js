document.addEventListener("DOMContentLoaded", function () {
  const requiredFiles = ["ticketZone.ui.min.css"];

  function checkAllResourcesLoaded() {
    const resources = performance.getEntriesByType("resource");
    const loadedFiles = resources
      .map((res) => res.name.split("/").pop())
      .filter((name) => requiredFiles.includes(name));
    // console.log(resources);

    return requiredFiles.every((file) => loadedFiles.includes(file));
  }

  if (document.getElementById("search-box")) {
    function fetchEngine() {
      try {
        const xhrobj = new XMLHttpRequest();
        xhrobj.open("GET", "searchengine.bc");
        xhrobj.send();

        xhrobj.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            const container = document.getElementById("search-box");
            container.innerHTML = xhrobj.responseText;
            document.querySelector(
              "#r-tour .searchList input.reserve-location"
            ).readOnly = true;

            const depLabel = document.querySelectorAll(
              "#r-flight .departure-route label span"
            );
            depLabel.forEach((span) => {
              span.innerText = "From";
            });
            const depHInput = document.querySelectorAll(
              "#r-hotel .departure-route input.text-value"
            );
            const depHLabel = document.querySelectorAll(
              "#r-hotel .departure-route label span"
            );
            depHInput.forEach((input) => {
              input.placeholder = "City or Airport";
            });
            depHLabel.forEach((span) => {
              span.innerText = "To";
            });
            depLabel.forEach((span) => {
              span.innerText = "From";
            });
            const depInput = document.querySelectorAll(
              "#r-flight .departure-route input.text-value"
            );
            depInput.forEach((input) => {
              input.placeholder = "City or Airport";
            });
            const desInput = document.querySelectorAll(
              ".destination-route input.text-value"
            );
            desInput.forEach((input) => {
              input.placeholder = "City or Airport";
            });
            const desLabel = document.querySelectorAll(
              ".destination-route label span"
            );
            desLabel.forEach((span) => {
              span.innerText = "To";
            });
            const dateInput = document.querySelectorAll(
              ".Basis_Date_Box .reserve-field input"
            );
            dateInput.forEach((input) => {
              input.placeholder = "Select";
            });

            const fTSpan = document.querySelector(
              "#search-box .reserve-field.flightclass-field div.border-type-1.cursor-pointer.h-full.rounded-type-1.px-2 label span"
            );
            const fTSpanSecond = document.querySelector(
              "#search-box #r-flighthotel .flightclass-field div.border-type-1.cursor-pointer.h-full.rounded-type-1.px-2 label span"
            );
            fTSpanSecond.innerHTML =
              "Show More Option <p class='prreferd text-sm text-zinc-900'>(Perferred Airline T Class)</p>";
            fTSpan.innerHTML =
              "Show More Option <p class='prreferd text-sm text-zinc-900'>(Perferred Airline T Class)</p>";
            const scripts = container.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
              const scriptTag = document.createElement("script");
              if (scripts[i].src) {
                scriptTag.src = scripts[i].src;
                scriptTag.async = false;
              } else {
                scriptTag.text = scripts[i].textContent;
              }
              document.head
                .appendChild(scriptTag)
                .parentNode.removeChild(scriptTag);
            }
          }
        };
      } catch (error) {
        console.error("مشکلی پیش آمده است. لطفا صبور باشید", error);
      }
    }

    function waitForFiles() {
      if (checkAllResourcesLoaded()) {
        fetchEngine();
      } else {
        setTimeout(waitForFiles, 500);
      }
    }
    waitForFiles();
  }
});
// ____________________________________
// ____________________________________
// ____________________________________
// ____________________________________
// ____________________________________
// ____________________________________
// _______________________________
// _______________________________
// _______________________________
function watchForFlightTypeField(callback) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches(".flighttype-field")) {
            callback(node);
          }

          const matches = node.querySelectorAll(".flighttype-field");
          matches.forEach((match) => callback(match));
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  document.querySelectorAll(".flighttype-field").forEach(callback);
}
watchForFlightTypeField((el) => {
  const liObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const target = mutation.target;
        if (target.classList.contains("active-module")) {
          const navValue = target.getAttribute("data-nav");
          if (navValue) {
            document.querySelectorAll(".reservation-item li").forEach((li) => {
              const val = li.getAttribute("data-nav");
              if (val) {
                document.body.classList.remove(val);
              }
            });
            document.body.classList.add(navValue);
          }
        }
      }
    }
  });

  const reservationItems = document.querySelectorAll(".reservation-item li");
  reservationItems.forEach((li) => {
    liObserver.observe(li, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });
});

// _____________________________________________________________
if (document.querySelectorAll(".swiper-4").length > 0)
  swiper = new Swiper(".swiper-4", {
    slidesPerView: 4,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 8,
    grabCursor: !0,
    autoplay: { delay: 6500, disableOnInteraction: !1 },
    loop: 0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 4, spaceBetween: 8 },
      768: { slidesPerView: 4, spaceBetween: 8 },
      1024: { slidesPerView: 4, spaceBetween: 8 },
    },
  });
if (document.querySelectorAll(".swiper-3").length > 0)
  swiper = new Swiper(".swiper-3", {
    slidesPerView: 3,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 16,
    grabCursor: !0,
    autoplay: { delay: 6500, disableOnInteraction: !1 },
    loop: 0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 3, spaceBetween: 16 },
      768: { slidesPerView: 3, spaceBetween: 16 },
      1024: { slidesPerView: 3, spaceBetween: 16 },
    },
  });
if (document.querySelectorAll(".swiper-mobile").length > 0)
  swiper = new Swiper(".swiper-mobile", {
    slidesPerView: 1.7,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 10,
    grabCursor: !0,
    autoplay: { delay: 6500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 1.7, spaceBetween: 10 },
      768: { slidesPerView: 1.48, spaceBetween: 10 },
      1024: { slidesPerView: 1.48, spaceBetween: 10 },
    },
  });
const headerMenu = document.querySelector(".header-menu");
const headerMenuClose = document.querySelector(".header-menu-close");
const bars3 = document.querySelector(".bars3");

if (window.innerWidth >= 1024) {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.visibility = "hidden";
    headerMenu.style.opacity = "0";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.visibility = "visible";
    headerMenu.style.opacity = "1";
  });
} else {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(1024px)";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(0)";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const dropdownIcons = document.querySelectorAll(".dropdown-icon");

  toggleDropdowns.forEach((toggle, index) => {
    const submenu = toggle.nextElementSibling;
    const dropdownIcon = dropdownIcons[index];

    toggle.addEventListener("click", function () {
      dropdownIcon.classList.toggle("rotate-180");

      if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        submenu.style.opacity = "0";
      } else {
        submenu.style.maxHeight = submenu.scrollHeight * 30 + "px";
        submenu.style.opacity = "1";
      }
    });
  });
});

// _________________________________________________

// _______________________________________
// _______________________________________
// _______________________________________
document.addEventListener("DOMContentLoaded", function () {
  const headerB = document.querySelector("header.gap-0.flex");

  if (!headerB) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 1370) {
      headerB.style.position = "fixed";
      headerB.style.top = "0";
      headerB.style.left = "0";
      headerB.style.width = "100%";
      headerB.style.zIndex = "60";
      headerB.style.boxShadow = "0px 4px 20px 0px #27272714";
    } else {
      headerB.style.position = "";
      headerB.style.top = "";
      headerB.style.left = "";
      headerB.style.width = "";
      headerB.style.zIndex = "";
      headerB.style.boxShadow = "";
    }
  });
});
const target = document.querySelector("main");
document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".header-landing-items")) {
    const isHomePage = window.location.pathname === "/";
    const isNotHome = !isHomePage;

    const flightItem = document.querySelectorAll('div[data-id="flight"]');
    const hotelItem = document.querySelectorAll('div[data-id="hotel"]');
    const flightHotelItem = document.querySelectorAll(
      'div[data-id="flighthotel"]'
    );
    if (isNotHome) {
      if (flightItem) {
        flightItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/flight";
          });
        });
      }
      if (flightHotelItem) {
        flightHotelItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/flighthotel";
          });
        });
      }

      if (hotelItem) {
        hotelItem.forEach((item) => {
          item.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "/hotel";
          });
        });
      }
    } else {
      if (flightItem) {
        flightItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("flight");
            check_landing("flight");
          });
        });
      }
      if (flightHotelItem) {
        flightHotelItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("flighthotel");
            check_landing("flighthotel");
          });
        });
      }
      if (hotelItem) {
        hotelItem.forEach((item) => {
          item.addEventListener("click", function () {
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
            check_searchHistory("hotel");
            check_landing("hotel");
          });
        });
      }
    }
  }
});
// _____________________________________________________
// _____________________________________________________
// _____________________________________________________
// _____________________________________________________
document.addEventListener("DOMContentLoaded", function () {
  const desktopContainer = document.querySelector(
    ".Login-or-Creat-acount-desktop"
  );
  const mobileContainer = document.querySelector(
    ".Login-or-Creat-acount-mobile"
  );

  // برای ذخیره‌ی محتوای اولیه فقط یک‌بار
  let originalContent = desktopContainer.innerHTML;

  function moveContentBasedOnWidth() {
    const isMobile = window.innerWidth <= 848;

    if (isMobile) {
      if (desktopContainer.innerHTML.trim() !== "") {
        mobileContainer.innerHTML = desktopContainer.innerHTML;
        desktopContainer.innerHTML = "";
      }
    } else {
      if (desktopContainer.innerHTML.trim() === "") {
        desktopContainer.innerHTML =
          mobileContainer.innerHTML || originalContent;
        mobileContainer.innerHTML = "";
      }
    }
  }

  moveContentBasedOnWidth();

  window.addEventListener("resize", moveContentBasedOnWidth);
});

// _____________________________________________________
// _____________________________________________________
// _____________________________________________________
// _____________________________________________________
// ________________________________________________

// footer form

function uploadDocument(args) {
  const captcha = document
    .getElementById("contactform")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .getElementById("contactform")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);

  // __________________

  // __________________

  $bc.setSource("cms.upload", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}
function refreshCaptcha(e) {
  $bc.setSource("captcha.refresh", true);
}
function captchaRendered() {
  document.querySelector(".contactUsInput").placeholder = "Code";
}
async function OnProcessedEditObject(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.getElementById("message-api").innerHTML =
      "Your request has been successfully submitted.";
    document
      .getElementById("contactform")
      .querySelector(".email-ans")
      .querySelector("input").value = "";

    refreshCaptcha();
  } else {
    console.log(errorid);
    refreshCaptcha();
    document
      .getElementById("contactform")
      .querySelector(".email-ans")
      .querySelector("input").value = "";

    setTimeout(() => {
      document.getElementById("message-api").innerHTML =
        "an error occured,try again";
    }, 2000);
  }
}
async function RenderForm() {
  document.querySelector(".email-ans").querySelector("input").placeholder =
    " Your email address ";
}

document
  .querySelector("#contactform button.data-body-btn")
  ?.addEventListener("click", () => {
    const inputs = document.querySelectorAll(
      "#contactform input:not([type='hidden'])"
    );
    let allFilled = true;
    console.log(allFilled, "1");

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        allFilled = false;
        console.log(allFilled, "2");
      }
    });
    if (!allFilled) {
      console.log(allFilled, "3");
      const messageBox = document.querySelector(
        ".message-api.font-danaregular"
      );

      // messageBox.innerHTML = "Please fill out all fields.";

      setTimeout(() => {
        messageBox.innerHTML = "";
      }, 12000);
      return;
    }
  });
// _________________________________________
// _________________________________________
// _________________________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-faq"),
    t = document.querySelectorAll(".faq-li");

  if (t.length >= 1) {
    t[0].classList.add("active");
    let n = t[0].getAttribute("data-id");
    if (e) {
      (async function () {
        let t = await fetch(`/faq-load-items.bc?id=${n}`),
          c = await t.text();
        e.innerHTML = c;
        for (
          var r = document
              .querySelector(".fetch-content-faq")
              .getElementsByTagName("script"),
            a = 0;
          a < r.length;
          a++
        ) {
          var o = document.createElement("script");
          r[a].src
            ? ((o.src = r[a].src), (o.async = !1))
            : (o.text = r[a].textContent),
            document.head.appendChild(o).parentNode.removeChild(o);
        }
      })(),
        t.forEach((n) => {
          n.addEventListener("click", function () {
            t.forEach((e) => {
              (e.style.backgroundColor = ""), (e.style.color = "");
              e.classList.remove("active");
            }),
              (document.querySelector(
                ".fetch-content-faq"
              ).innerHTML = `<div class="w-80px h-80px flex justify-center items-center bg-primary-900 p-6 rounded-full"><span class="loader"></span></div>`),
              (n.style.backgroundColor = "var(--primary-100)");
            n.classList.add("active");
            const paths = n.querySelectorAll("svg path");
            paths.forEach((path) => {
              path.style.fill = "var(--primary-500)";
            });
            let c = n.getAttribute("data-id");
            !(async function () {
              try {
                let a = await fetch(`/faq-load-items.bc?id=${c}`);
                if (!a.ok) throw Error(`HTTP error! Status: ${a.status}`);
                let o = await a.text();
                e.innerHTML = o;
                for (
                  var t = document
                      .querySelector(".fetch-content-faq")
                      .getElementsByTagName("script"),
                    n = 0;
                  n < t.length;
                  n++
                ) {
                  var r = document.createElement("script");
                  t[n].src
                    ? ((r.src = t[n].src), (r.async = !1))
                    : (r.text = t[n].textContent),
                    document.head.appendChild(r).parentNode.removeChild(r);
                }
              } catch (t) {
                e.innerHTML = "<p>an error occured: " + t.message + "</p>";
              }
            })();
          });
        });
    }
  }
});
// ________________________________________________
// ________________________________________________
// ________________________________________________
// ________________________________________________
// _________________________________________________
function handleCommonQS(container) {
  const boxes = container.querySelectorAll(".box");

  boxes.forEach((box) => {
    const counter = box.querySelector(".counter");
    if (counter) {
      let current = parseInt(counter.textContent.trim());
      if (!isNaN(current) && current > 0) {
        counter.textContent = current - 1;
      }
    }

    box.addEventListener("click", () => {
      box.classList.toggle("active");
    });

    // حذف کلاس active هنگام کلیک خارج از box
    document.addEventListener("click", (e) => {
      if (!box.contains(e.target)) {
        box.classList.remove("active");
      }
    });
  });
}

document.querySelectorAll(".common-qs").forEach(handleCommonQS);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        if (node.classList.contains("common-qs")) {
          handleCommonQS(node);
        }

        const insideCommonQS = node.querySelectorAll?.(".common-qs");
        if (insideCommonQS?.length) {
          insideCommonQS.forEach(handleCommonQS);
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// _______________________________________
// _______________________________________
// _______________________________________
// ________________________________
// ________________________________
// ________________________________
// ________________________________
if (document.getElementById("search-content-article")) {
  var input = document.getElementById("search-content-name"),
    isItemSelected = !1;
  if (input) {
    function contentSearched(e, t) {
      (input.value = e),
        (document.getElementById("catidsearched").value = t),
        document.querySelector(".search-content ul").classList.add("hidden"),
        document.querySelector(".search-content ul").classList.remove("flex"),
        (isItemSelected = !0);
    }
    input.onkeyup = function () {
      const dropdown = document.querySelector(".search-content ul");
      const items = document
        .querySelector(".search-content")
        .getElementsByTagName("li");

      const filter = this.value.trim().toUpperCase();
      isItemSelected = !1;

      if (filter.length > 0) {
        dropdown.classList.remove("hidden");
        dropdown.classList.add("flex");

        for (let i = 0; i < items.length; i++) {
          items[i].innerHTML.toUpperCase().includes(filter)
            ? (items[i].style.display = "list-item")
            : (items[i].style.display = "none");
        }
      } else {
        dropdown.classList.add("hidden");
        dropdown.classList.remove("flex");

        for (let i = 0; i < items.length; i++) {
          items[i].style.display = "list-item";
        }
      }
    };

    document
      .getElementById("search-content-article")
      .addEventListener("submit", function (e) {
        if (!isItemSelected) {
          e.preventDefault(),
            (document.getElementById("catidsearched").value = 0);
          for (
            var t = document
                .querySelector(".search-content")
                .getElementsByTagName("li"),
              n = 0;
            n < t.length;
            n++
          )
            t[n].style.display = "list-item";
          document
            .querySelector(".search-content ul")
            .classList.remove("hidden"),
            document.querySelector(".search-content ul").classList.add("flex");
        }
      });
    document.querySelectorAll(".search-drop-down li").forEach((e) => {
      const t = e.querySelector("span").innerText;
      e.addEventListener("click", () => {
        document.querySelector("#search-content-article").action = t;
      });
    });
    // همگام‌سازی href تگ a داخل فرم با مقدار action
    const form = document.getElementById("search-content-article");
    const linkInForm = form.querySelector("a");

    function updateLinkHref() {
      if (form && linkInForm) {
        const action = form.getAttribute("action");
        if (action && action.trim() !== "") {
          linkInForm.setAttribute("href", action);
        } else {
          linkInForm.removeAttribute("href");
        }
      }
    }

    // بار اول چک شود
    updateLinkHref();

    // هر بار که اکشن تغییر کرد، لینک هم آپدیت شود
    document.querySelectorAll(".search-drop-down li").forEach((e) => {
      const t = e.querySelector("span").innerText;
      e.addEventListener("click", () => {
        document.querySelector("#search-content-article").action = t;
        updateLinkHref();
      });
    });
  }
}

// ________________________________
// ________________________________
// ________________________________
// ________________________________
// ________________________________
// _____________________________________________________
document.addEventListener("DOMContentLoaded", function () {
  const currencyContainer = document.querySelector(".currency-content");

  if (!currencyContainer) return;

  const svgIcon = `<svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.31428 17.006V12.6803C8.44818 12.6926 9.3661 13.6537 9.3661 14.8363C9.3661 16.0256 8.44818 16.9936 7.31428 17.006ZM2.6339 7.6175C2.6339 6.40887 3.53858 5.42712 4.68038 5.33775V9.911C3.5399 9.82163 2.6339 8.833 2.6339 7.6175ZM12 14.8363C12 12.1371 9.89946 9.94263 7.31428 9.93025V5.32125H7.76205C8.64572 5.32125 9.36478 6.06787 9.36478 6.985V7.16237C9.36478 7.92275 9.95477 8.53737 10.6817 8.53737C11.4087 8.53737 11.9987 7.92275 11.9987 7.16237V6.985C11.9987 4.55125 10.0983 2.57125 7.76205 2.57125H7.31428V1.375C7.31428 0.614625 6.72429 0 5.99733 0C5.27038 0 4.68038 0.614625 4.68038 1.375V2.58775C2.08605 2.67987 0 4.89225 0 7.61888C0.00131695 10.3496 2.08869 12.5689 4.68038 12.661V17.0088H4.23789C3.35428 17.0088 2.63654 16.2566 2.63654 15.3312C2.63654 14.5709 2.04654 13.9562 1.31959 13.9562C0.592629 13.9562 0.00263371 14.5709 0.00263371 15.3312C0.00263371 17.7719 1.903 19.7588 4.23789 19.7588H4.68038V20.625C4.68038 21.384 5.27038 22 5.99733 22C6.72429 22 7.31428 21.384 7.31428 20.625V19.756C9.89946 19.7436 12 17.5422 12 14.8363Z" fill="white"></path></svg>`;

  function replaceCurrencyText() {
    const currencyIcon = document.querySelector(".currency__icon");
    if (currencyIcon && currencyIcon.textContent.trim() === "--Currency--") {
      currencyIcon.innerHTML = svgIcon;
    }
  }

  replaceCurrencyText();

  const observer = new MutationObserver(replaceCurrencyText);
  observer.observe(currencyContainer, { childList: true, subtree: true });

  setInterval(replaceCurrencyText, 100);
});

/*------------------CURRENCY-----------------------*/
document.addEventListener("DOMContentLoaded", function () {
  localStorage_getCurrency();

  if (document.querySelector(".contain-currency-show")) {
    document.querySelector(".currency-selected").setAttribute("onclick", "");
  }

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".currency-selected,.currency-list")) {
      document.querySelector(".currency-list").classList.add("unvisible");
    }
  });
});

function currency_selected(element) {
  if (!document.querySelector(".contain-currency")) {
    if (!document.querySelector(".contain-currency-show")) {
      let headerResize = element.closest(".header-t");
      let currencySelected = headerResize.querySelector(".currency-selected");

      if (currencySelected.getAttribute("data-active") == 0) {
        headerResize
          .querySelector(".currency-loading")
          .classList.toggle("hidden");

        fetch("/Client_Currency_Rate.bc")
          .then((response) => response.text())
          .then((text) => {
            console.log("Server response:", text);
            const data_currency = JSON.parse(text.replace(/\'/g, '"'));
            let currencyList = headerResize.querySelector(".currency-list ul");
            data_currency.rate.forEach((rate) => {
              let listItem = document.createElement("li");
              listItem.setAttribute("data-cost", rate.rate_cost);
              listItem.setAttribute(
                "data-floatdigit",
                data_currency.floatdigit
              );
              listItem.textContent = rate.rate_unit;
              listItem.addEventListener("click", function () {
                select_currency(listItem);
              });
              currencyList.appendChild(listItem);
            });

            headerResize
              .querySelector(".currency-loading")
              .classList.toggle("hidden");
            currencySelected.setAttribute("data-active", 1);
            headerResize
              .querySelector(".currency-list")
              .classList.toggle("unvisible");
          })
          .catch((error) => console.error(error));
      } else {
        headerResize
          .querySelector(".currency-list")
          .classList.toggle("unvisible");
      }
    }
  }
}

function select_currency(element) {
  let headerResize = element.closest(".header-t");
  headerResize.querySelector(".currency-list").classList.toggle("unvisible");
  headerResize.querySelector(
    ".currency-selected"
  ).innerHTML = `<div>${element.innerText}</div>`;
  localStorage_setCurrency(
    element.innerText,
    element.getAttribute("data-cost"),
    element.getAttribute("data-floatdigit")
  );
}

function localStorage_setCurrency(currency_unit, currency_cost, floatdigit) {
  let currencyObject = {
    currency_unit: currency_unit,
    currency_cost: currency_cost,
    floatdigit: floatdigit,
    time: new Date().getTime(),
    expire: 1200000,
  };
  localStorage.setItem("currencyObject", JSON.stringify(currencyObject));
  localStorage_getCurrency();
}

function localStorage_getCurrency() {
  let getCurrencyObject = localStorage.getItem("currencyObject");
  let jsonCurrency = JSON.parse(getCurrencyObject);

  if (jsonCurrency) {
    document.querySelector(
      ".currency-selected"
    ).innerHTML = `<div>${jsonCurrency.currency_unit}</div>`;

    var timer = setInterval(function () {
      if (new Date().getTime() - jsonCurrency.time >= jsonCurrency.expire) {
        localStorage.removeItem("currencyObject");
        document.querySelector(
          ".currency-selected"
        ).innerHTML = `<div>--Select--</div>`;
        document
          .querySelector(".currency-selected")
          .setAttribute("data-active", 0);
        clearInterval(timer);
        console.log("localStorage has expired");
      }
    }, 1000);
  }
}
// ________________________________________________

// Select DOM elements
const sideNavItems = document.querySelectorAll(".sidenav-item");
const notification = document.querySelector("#notifications");
const notificationPopup = document.querySelector(".notification-popup");
const notificationCount = document.querySelector("#notificationCount");
const messages = document.querySelector("#messages");
const messagesSection = document.querySelector(".messages-section");
const messagesCount = document.querySelector("#messagesCount");
const themeCustomizationPopup = document.querySelector(
  ".theme-customize-section"
);
const theme = document.querySelector("#theme");
const themeControlsSection = document.querySelector(
  ".theme-controls-container"
);
const themeCustomizationPopupCloseBtn = document.querySelector(
  ".theme-customize-section__close-btn"
);

// Add click event listener to each sidenav item
sideNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Remove active class from all sidenav items
    sideNavItems.forEach((item) => {
      item.classList.remove("active");
    });
    // Add active class to the clicked item
    item.classList.add("active");
  });
});

// Show notification popup when notification icon is clicked
notification.addEventListener("click", () => {
  notificationPopup.style.display = "block";
  notificationCount.style.display = "none";
});

// Hide notification popup, theme customize model and messages section when clicked outside
const closePopups = (event) => {
  const isClickedInsideNotificationPopup = notificationPopup.contains(
    event.target
  );
  const isClickedNotification = notification.contains(event.target);
  const isClickedInsideMessagesSection = messagesSection.contains(event.target);
  const isClickedMessages = messages.contains(event.target);
  const isClickedThemeControlsSection = themeControlsSection.contains(
    event.target
  );
  const isClickedTheme = theme.contains(event.target);

  if (
    notificationPopup.style.display === "block" &&
    !isClickedInsideNotificationPopup &&
    !isClickedNotification
  ) {
    notificationPopup.style.display = "none";
    notification.classList.remove("active");
  }

  if (!isClickedInsideMessagesSection && !isClickedMessages) {
    messagesSection.classList.remove("active");
    messages.classList.remove("active");
  }

  if (
    themeCustomizationPopup.style.display === "flex" &&
    !isClickedThemeControlsSection &&
    !isClickedTheme
  ) {
    themeCustomizationPopup.style.display = "none";
    theme.classList.remove("active");
  }
};

// Add click event listener to the document to handle clicks outside of popups
document.addEventListener("click", closePopups);

// Add click event listener to messages icon to show and hide messages section
messages.addEventListener("click", () => {
  messagesSection.classList.remove("active");
  setTimeout(() => {
    messagesSection.classList.add("active");
  }, 10);
  setTimeout(() => {
    messagesSection.classList.remove("active");
  }, 2000);
  messagesCount.style.display = "none";
});

// Add input event listener to message search input to filter messages
const messageSearchInput = document.querySelector("#messageSearchInput");

messageSearchInput.addEventListener("input", () => {
  const messageSearchInputValue = messageSearchInput.value.toLowerCase();
  const messageItems = document.querySelectorAll(".message");

  // Loop through all message items and hide or show based on search input value
  messageItems.forEach((item) => {
    const messageItemText = item
      .querySelector(".message__name")
      .textContent.toLowerCase();
    if (messageItemText.includes(messageSearchInputValue)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

// theme customization window functionality
theme.addEventListener("click", () => {
  themeCustomizationPopup.style.display = "flex";
});

themeCustomizationPopupCloseBtn.addEventListener("click", () => {
  themeCustomizationPopup.style.display = "none";
  theme.classList.remove("active");
});

// font settings functionality
const fontSizeListItems = document.querySelectorAll(".font-size-list li");
const defaultFontSize = "16px";

fontSizeListItems.forEach((size) => {
  size.addEventListener("click", (event) => {
    let fontSize = defaultFontSize;
    switch (event.target.classList.value) {
      case "font-size-1":
        fontSize = "10px";
        break;
      case "font-size-2":
        fontSize = "12px";
        break;
      case "font-size-3":
        fontSize = "14px";
        break;
      case "font-size-4":
        fontSize = "16px";
        break;
      case "font-size-5":
        fontSize = "18px";
        break;
    }

    document.querySelector("html").style.fontSize = fontSize;

    fontSizeListItems.forEach((item) => {
      item.classList.remove("active");
    });

    size.classList.add("active");
  });
});

// color setting functionality
const colorListItems = document.querySelectorAll(".color-list li");
const rootStyles = getComputedStyle(document.documentElement);
const defaultColor = rootStyles.getPropertyValue("--color-theme-01");

colorListItems.forEach((colorItem) => {
  colorItem.addEventListener("click", (event) => {
    let color = defaultColor;
    switch (event.target.classList.value) {
      case "color-1":
        color = rootStyles.getPropertyValue("--color-theme-01");
        break;
      case "color-2":
        color = rootStyles.getPropertyValue("--color-theme-02");
        break;
      case "color-3":
        color = rootStyles.getPropertyValue("--color-theme-03");
        break;
      case "color-4":
        color = rootStyles.getPropertyValue("--color-theme-04");
        break;
      case "color-5":
        color = rootStyles.getPropertyValue("--color-theme-05");
        break;
    }

    document.documentElement.style.setProperty("--primary-color", color);

    colorListItems.forEach((item) => {
      item.classList.remove("active");
    });

    colorItem.classList.add("active");
  });
});

// background-color setting functionality

const backgroundColorListItems = document.querySelectorAll(
  ".background-colors-list .background-color-item"
);
const defaultBackgroundColor = rootStyles.getPropertyValue(
  "--background-color-theme-light"
);

const changeTheme = (theme) => {
  backgroundColorListItems.forEach((item) => {
    item.classList.remove("active");
  });

  document.querySelector("html").classList.remove("dark-theme");
  document.querySelector("html").classList.remove("lights-out-theme");
  if (theme === "light-theme") {
    // do nothing because it's already the default theme
    return;
  }
  document.querySelector("html").classList.add(theme);
};

for (let i = 0; i < backgroundColorListItems.length; i++) {
  if (backgroundColorListItems[i].classList.contains("background-color-1")) {
    backgroundColorListItems[i].addEventListener("click", (event) => {
      changeTheme("light-theme");
      backgroundColorListItems[i].classList.add("active");
    });
  }
  if (backgroundColorListItems[i].classList.contains("background-color-2")) {
    backgroundColorListItems[i].addEventListener("click", (event) => {
      changeTheme("dark-theme");
      backgroundColorListItems[i].classList.add("active");
    });
  }
  if (backgroundColorListItems[i].classList.contains("background-color-3")) {
    backgroundColorListItems[i].addEventListener("click", (event) => {
      changeTheme("lights-out-theme");
      backgroundColorListItems[i].classList.add("active");
    });
  }
}

// backgroundColorListItems.forEach((colorItem) => {
//   colorItem.addEventListener("click", (event) => {

//     document.querySelector("html").classList.remove("dark-theme");
//     document.querySelector("html").classList.remove("lights-out-theme");

//     switch (event.target.classList.value) {
//       case "background-color-item background-color-1 card":
//         // default theme is light theme
//         break;
//       case "background-color-item background-color-2 card":
//         document.querySelector("html").classList.add("dark-theme");
//         break;
//       case "background-color-item background-color-3 card":
//         document.querySelector("html").classList.add("lights-out-theme");
//         break;
//     }

//     backgroundColorListItems.forEach((item) => {
//       item.classList.remove("active");
//     });

//     colorItem.classList.add("active");
//   });
// });

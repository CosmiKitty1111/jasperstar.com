void (async function () {
  // -- Add section templates to the page --
  // Get the imported document in templates:
  let templates = document.createElement("template");
  templates.innerHTML = await (await fetch("templates.html")).text();

  // Fetch header and footer templates:
  let header = templates.content.querySelector("#header");
  let footer = templates.content.querySelector("#footer");
  let headerClone = header.content.cloneNode(true);
  let footerClone = footer.content.cloneNode(true);

  // Append the templates onto the page:
  try {
    document.getElementById("pageHeader").appendChild(headerClone);
  } catch (e) {
    console.error("Cannot append header template.\n" + e.message);
  }
  try {
    document.getElementById("pageFooter").appendChild(footerClone);
  } catch (e) {
    console.error("Cannot append footer template.\n" + e.message);
  }

  // -- Highlight relevant navbar item dynamically --

  // Get current page URL
  let url = window.location.pathname;
  let filename = url.substring(url.lastIndexOf("/") + 1);

  // If file name not available, set default to 'index.html'
  if (filename == "") {
    filename = "index.html";
  }
  // Get all nav links
  const navItems = document.querySelectorAll(".flexNav li a, .cartNav li a");

  // Loop through all links
  navItems.forEach((navItem) => {
    let linkPath = navItem.pathname;
    let linkFilename = linkPath.substring(linkPath.lastIndexOf("/") + 1);
    // Check if link is active
    if (filename === linkFilename) {
      // Add 'active' class
      navItem.classList.add("active");
    }
  });
})();

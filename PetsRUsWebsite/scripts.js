void async function () {
    //get the imported document in templates:
    var templates = document.createElement( 'template' );
    templates.innerHTML = await ( await fetch( 'templates.html' ) ).text();

    //fetch header and footer templates:
    var header = templates.content.querySelector( '#header' );
    var footer = templates.content.querySelector( '#footer' );
    var headerClone = header.content.cloneNode(true);
    var footerClone = footer.content.cloneNode(true);

    //append the templates onto the page:
    document.getElementById("pageHeader").appendChild(headerClone);
    document.getElementById("pageFooter").appendChild(footerClone);
} ()

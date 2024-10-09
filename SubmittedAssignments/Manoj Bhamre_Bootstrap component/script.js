// Define the card configuration directly in the JavaScript
const card = {
    header: "Card Header",
    title: "Card Title",
    subTitle: "Card Subtitle",
    description: "This is a short description of the card.",
    extraDescription: "This is the extra description that provides more detailed information about the card. It can be toggled to show or hide without changing the card's shape.",
    footer: "Card Footer",
    color: "info",
    image: "image.jpeg",
    position: "top" // Change this to "top", "right", or "bottom" as needed
};

// Create the card
const container = document.createElement('div');
container.className = 'container mt-5';
const row = document.createElement('div');
row.className = 'row justify-content-center'; // Center the card

const col = document.createElement('div');
col.className = 'col-mb-3';

const cardDiv = document.createElement('div');
cardDiv.className = `card text-black bg-${card.color} mb-3`; // No need for position-relative

// Create card header
const cardHeader = document.createElement('div');
cardHeader.className = 'card-header';
cardHeader.innerText = card.header;
cardDiv.appendChild(cardHeader);

const img = document.createElement('img');
img.src = card.image;
img.alt = `${card.title} Image`;
img.className = 'card-img-top'; // Default class for top images
img.style.objectFit = 'cover'; // Ensures the image covers the area without distorting
img.style.width = '100%'; // Make sure the image takes full width
img.style.height = '400px'; // Set a fixed height for consistency

const cardBody = document.createElement('div');
cardBody.className = 'card-body';

// Add title and subtitle to the card body
const cardTitle = document.createElement('h5');
cardTitle.className = 'card-title';
cardTitle.innerText = card.title;

const cardSubTitle = document.createElement('h5');
cardSubTitle.className = 'card-subtitle mb-3 text-light'; // Styling for subtitle
cardSubTitle.innerText = card.subTitle;

// Create short description paragraph
const cardText = document.createElement('p');
cardText.className = 'card-text';
cardText.innerText = card.description;

// Create extra description paragraph
const extraCardText = document.createElement('p');
extraCardText.className = 'card-text';
extraCardText.innerText = card.extraDescription;
extraCardText.style.display = 'none'; // Initially hide the extra description

// Create "Read More" link
const readMoreLink = document.createElement('a');
readMoreLink.href = '#';
readMoreLink.innerText = 'Read More';
readMoreLink.className = 'text-danger'; // Optional: style the link color


// Toggle extra description on click
readMoreLink.onclick = (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    extraCardText.style.display = extraCardText.style.display === 'none' ? 'block' : 'none'; // Toggle display
    readMoreLink.innerText = extraCardText.style.display === 'none' ? 'Read More' : 'Read Less'; // Change link text
};

cardBody.appendChild(cardTitle);
cardBody.appendChild(cardSubTitle);
cardBody.appendChild(cardText);
cardBody.appendChild(extraCardText); // Append extra description
cardBody.appendChild(readMoreLink); // Append the "Read More" link

// Append the card body to the cardDiv
cardDiv.appendChild(img); // Append image directly to card
cardDiv.appendChild(cardBody); // Append card body

const cardFooter = document.createElement('div');
cardFooter.className = 'card-footer';
cardFooter.innerText = card.footer;

// Image positioning logic
if (card.position === 'top') {
    cardDiv.prepend(img);
} else if (card.position === 'bottom') {
    cardDiv.appendChild(img);
} else {
    const flexDiv = document.createElement('div');
    flexDiv.className = 'd-flex';

    img.style.width = '40%'; // Set image width for left/right positions

    if (card.position === 'left') {
        flexDiv.appendChild(img);
        flexDiv.appendChild(cardBody);
    } else if (card.position === 'right') {
        flexDiv.appendChild(cardBody);
        flexDiv.appendChild(img);
    }

    cardDiv.appendChild(flexDiv);
}

cardDiv.appendChild(cardFooter);
col.appendChild(cardDiv);
row.appendChild(col);
container.appendChild(row);
document.body.appendChild(container);

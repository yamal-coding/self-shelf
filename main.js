getShelves()
    .then((shelves) => {
        const shelvesElement = createShelves(shelves);
        document.querySelector('#room').appendChild(shelvesElement);
    });

async function getShelves() {
    try {
        const getShelvesResponse = await fetch('data/shelves.json');

        if (!getShelvesResponse.ok) {
            throw new Error("shelves.json could not be retrieved");
        }

        return await getShelvesResponse.json();
    } catch (error) {
        console.log(`Error fetching shelves.json: ${error}`);
        return [];
    }
}

function createShelf(elements) {
    const shelfElement = createEmptyShelf();

    const itemsElement = document.createElement('div');
    itemsElement.className = 'items';

    for (let i = 0; i < elements.length; i++) {
        const itemElement = document.createElement('img');
        itemElement.className = 'item';
        itemElement.src = elements[i].url;

        itemsElement.appendChild(itemElement);
    }

    shelfElement.appendChild(itemsElement);

    return shelfElement;
}

function createShelves(shelves) {
    const shelvesElement = document.createElement('div');
    shelvesElement.id = "shelves";

    const shelfTopImg = document.createElement('img');
    shelfTopImg.src = 'img/shelf_top.png';
    shelfTopImg.id = 'shelf_top';

    shelvesElement.appendChild(shelfTopImg);

    for (let i = 0; i < shelves.length; i++) {
        const shelfElement = createShelf(shelves[i]);
        shelvesElement.appendChild(shelfElement);
    }

    addBottomShelves(shelvesElement);

    return shelvesElement;
}

function addBottomShelves(shelvesElement) {
    shelvesElement.appendChild(createEmptyShelf());

    const shelveWithSignature = createShelf([{
        url: '/img/signature.png'
    }]);

    shelvesElement.appendChild(shelveWithSignature);
}

function createEmptyShelf() {
    const shelfElement = document.createElement('div');
    shelfElement.className = 'shelf-container';

    const shelfImg = document.createElement('img');
    shelfImg.className = 'shelf';
    shelfElement.appendChild(shelfImg);

    return shelfElement;
}

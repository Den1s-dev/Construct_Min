const progressBar = document.querySelector('.progress-bar');
let progressValue = 0;
const categoryButtons = document.querySelectorAll('.category-btn');
const categoryCards = document.getElementById('categoryCards');
const cardContainer = document.getElementById('cardContainer');
const selectedProductsList = document.getElementById('selectedProductsList');
const createSetButton = document.getElementById('createSetButton');
const categoryTitle = document.getElementById('categoryTitle');
let currentCategoryIndex = 0;
const categories = ['oven', 'cooktop', 'hood', 'microwave'];

function updateProgress() {
  const progress = (currentCategoryIndex / categories.length) * 100;
  progressBar.style.width = progress + '%';
  progressBar.setAttribute('aria-valuenow', progress);
}

function showCategoryCards(category) {
  categoryTitle.textContent = category;
  cardContainer.innerHTML = '';

  // Карточка
  for (let i = 1; i <= 4; i++) {
    const card = document.createElement('div');
    card.classList.add('col');
    card.innerHTML = `
      <div class="card">
        <img src="img/${category}${i}.jpg" class="card-img-top" alt="#">
        <div class="card-body">
          <h5 class="card-title">${category}${i}</h5>
          <button type="button" class="btn btn-primary select-product-btn" data-product="${category}${i}">Выбрать</button>
        </div>
      </div>
    `;
    cardContainer.appendChild(card);
  }

  categoryCards.style.display = 'block';
}

function createRemoveIcon() {
  const icon = document.createElement('span');
  icon.classList.add('remove-icon');
  icon.innerHTML = '&times;';
  return icon;
}

function addRemoveIcon(listItem) {
  const removeIcon = createRemoveIcon();
  listItem.appendChild(removeIcon);
}

function selectProduct(event) {
  const selectedProduct = event.target.getAttribute('data-product');
  const listItem = document.createElement('li');
  listItem.textContent = selectedProduct;
  addRemoveIcon(listItem); // Добавляем значок удаления
  selectedProductsList.appendChild(listItem);

  if (selectedProductsList.children.length >= 2) {
    createSetButton.style.display = 'block';
  }

  if (currentCategoryIndex < categories.length - 1) {
    currentCategoryIndex++;
    const nextCategory = categories[currentCategoryIndex];
    showCategoryCards(nextCategory);
  } else {
    categoryCards.style.display = 'none';
  }

  updateProgress();
}

function removeProduct(event) {
  const listItem = event.target.parentNode;
  if (listItem) {
    listItem.remove();
    if (selectedProductsList.children.length <= 2) {
      createSetButton.style.display = 'none';
    }
    currentCategoryIndex--;
    updateProgress();
  }
}

categoryButtons.forEach(button => {
  button.addEventListener('click', function () {
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    currentCategoryIndex = categories.indexOf(category);
    showCategoryCards(category);
    updateProgress();
  });
});

cardContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('select-product-btn')) {
    selectProduct(event);
  }
});

selectedProductsList.addEventListener('click', removeProduct);

// Toggle sidebar
const heartIcon = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.sidebar');
const main = document.querySelector('main');

heartIcon.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('expanded');
});

// Navegación
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        document.querySelectorAll('main section').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active-section');
        });
        
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.style.display = 'block';
        targetSection.classList.add('active-section');
    });
});

// Carrusel de imágenes
const images = [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&q=80'
];

const carouselContainer = document.querySelector('.carousel-container');
let currentIndex = 0;

images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.style.width = '100%';
    img.style.height = '400px';
    img.style.objectFit = 'cover';
    carouselContainer.appendChild(img);
});

function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

document.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
});

document.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
});

// Auto-rotate carousel
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
}, 5000);

// Poemas con animación
const poems = [
    {
        title: 'Amor Eterno',
        content: 'En cada latido de mi corazón,\nTu nombre resuena con pasión.\nEres mi luz, mi inspiración,\nMi más hermosa bendición.'
    },
    {
        title: 'Nuestro Amor',
        content: 'Como las estrellas en el cielo,\nNuestro amor brilla sin fin.\nJuntos escribimos esta historia,\nDe un amor puro y sin fin.'
    }
];

const poemsContainer = document.querySelector('.poems-container');
poems.forEach(poem => {
    const poemDiv = document.createElement('div');
    poemDiv.className = 'card poem-card';
    poemDiv.innerHTML = `
        <h3>${poem.title}</h3>
        <p style="white-space: pre-line">${poem.content}</p>
    `;
    poemsContainer.appendChild(poemDiv);
});

// Diario
const diaryEntries = JSON.parse(localStorage.getItem('diaryEntries') || '[]');
const currentUser = localStorage.getItem('currentUser');

document.querySelector('.save-entry').addEventListener('click', function() {
    const textarea = document.querySelector('textarea');
    const content = textarea.value.trim();
    
    if (content) {
        const entry = {
            content,
            date: new Date().toLocaleDateString(),
            author: currentUser,
            id: Date.now()
        };
        
        diaryEntries.unshift(entry);
        localStorage.setItem('diaryEntries', JSON.stringify(diaryEntries));
        updateDiaryEntries();
        textarea.value = '';
        
        // Animación de guardado exitoso
        showNotification('Entrada guardada con éxito');
    }
});

function updateDiaryEntries() {
    const entriesContainer = document.querySelector('.diary-entries');
    entriesContainer.innerHTML = '';
    
    diaryEntries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'card diary-card';
        entryDiv.innerHTML = `
            <p>${entry.content}</p>
            <div class="entry-meta">
                <span class="author">${entry.author}</span>
                <span class="date">${entry.date}</span>
            </div>
        `;
        entriesContainer.appendChild(entryDiv);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Inicializar la página
updateDiaryEntries();
document.querySelector('nav a[href="#inicio"]').click();
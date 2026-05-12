// Sermon data with audio files
const sermons = [
    {
        id: 1,
        title: "The Power of Faith",
        preacher: "Apostle Dr. Joseph Kingsley Eshun",
        date: "March 12, 2023",
        year: 2023,
        image: "resources/images/img1.jpg",
        audioUrl: "resources/audio/sermons/sermon2.mp4",
        downloadUrl: "resources/audio/sermons/sermon2.mp4"
    },
    {
        id: 2,
        title: "Walking in Love",
        preacher: "Reverned Moses",
        date: "February 28, 2023",
        year: 2023,
        image: "resources/images/img1.jpg",
        audioUrl: "sermons/walking-in-love.mp3",
        downloadUrl: "sermons/walking-in-love.mp3"
    },
    {
        id: 3,
        title: "Finding Peace in Troubled Times",
        preacher: "Reverned Augustine Asamoah",
        date: "February 14, 2023",
        year: 2023,
        image: "https://source.unsplash.com/random/600x400?bible,1",
        audioUrl: "sermons/finding-peace.mp3",
        downloadUrl: "sermons/finding-peace.mp3"
    },
    {
        id: 4,
        title: "The Prodigal Son",
        preacher: "Apostle Dr. Joseph Kingsley Eshun",
        date: "January 29, 2023",
        year: 2023,
        image: "https://source.unsplash.com/random/600x400?cross,1",
        audioUrl: "sermons/prodigal-son.mp3",
        downloadUrl: "sermons/prodigal-son.mp3"
    },
    {
        id: 5,
        title: "New Beginnings",
        preacher: "Reverned Moses",
        date: "December 31, 2022",
        year: 2022,
        image: "https://source.unsplash.com/random/600x400?worship,1",
        audioUrl: "sermons/new-beginnings.mp3",
        downloadUrl: "sermons/new-beginnings.mp3"
    },
    {
        id: 6,
        title: "The Christmas Message",
        preacher: "Reverned Augustine Asamoah",
        date: "December 24, 2022",
        year: 2022,
        image: "resources/images/img15.jpg",
        audioUrl: "sermons/christmas-message.mp3",
        downloadUrl: "sermons/christmas-message.mp3"
    },
      {
        id: 6,
        title: "The Christmas Message",
        preacher: "Reverned Augustine Asamoah",
        date: "December 24, 2022",
        year: 2021,
        image: "resources/images/img15.jpg",
        audioUrl: "sermons/christmas-message.mp3",
        downloadUrl: "sermons/christmas-message.mp3"
    }
];

// DOM elements
const sermonsContainer = document.getElementById('sermons-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const noResults = document.getElementById('no-results');
const audioModal = document.getElementById('audio-modal');
const closeModal = document.querySelector('.close-modal');
const audioPlayer = document.getElementById('audio-player');
const audioModalTitle = document.getElementById('audio-modal-title');
const audioModalPreacher = document.getElementById('audio-modal-preacher');
const downloadAudioBtn = document.getElementById('download-audio-btn');

// Current state
let currentFilter = 'all';
let currentSearch = '';
let currentAudio = null;

// Initialize the page
function init() {
    renderSermons(sermons);
    setupEventListeners();
}

// Set up event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            filterAndRender();
        });
    });

    // Audio modal
    closeModal.addEventListener('click', closeAudioModal);
    window.addEventListener('click', function(event) {
        if (event.target === audioModal) {
            closeAudioModal();
        }
    });
}

// Handle search
function handleSearch() {
    currentSearch = searchInput.value.trim().toLowerCase();
    filterAndRender();
}

// Filter sermons based on current filter and search
function filterSermons() {
    let filtered = [...sermons];

    // Apply filter
    if (currentFilter !== 'all') {
        const [filterType, filterValue] = currentFilter.split(':');
        
        if (filterType === 'year') {
            const year = parseInt(filterValue);
            filtered = filtered.filter(sermon => sermon.year === year);
        } else if (filterType === 'preacher') {
            filtered = filtered.filter(sermon => sermon.preacher === filterValue);
        }
    }

    // Apply search
    if (currentSearch) {
        filtered = filtered.filter(sermon => 
            sermon.title.toLowerCase().includes(currentSearch) || 
            sermon.preacher.toLowerCase().includes(currentSearch) ||
            sermon.date.toLowerCase().includes(currentSearch)
        );
    }

    return filtered;
}

// Filter and render sermons
function filterAndRender() {
    const filteredSermons = filterSermons();
    renderSermons(filteredSermons);
}

// Render sermons to the DOM
function renderSermons(sermonsToRender) {
    // Clear container
    sermonsContainer.innerHTML = '';

    // Show no results message if empty
    if (sermonsToRender.length === 0) {
        noResults.style.display = 'block';
        return;
    } else {
        noResults.style.display = 'none';
    }

    // Create and append sermon cards
    sermonsToRender.forEach((sermon, index) => {
        const card = document.createElement('div');
        card.className = 'sermon-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="sermon-image" style="background-image: url('${sermon.image}')">
                <span class="sermon-year">${sermon.year}</span>
            </div>
            <div class="sermon-content">
                <h3 class="sermon-title">${sermon.title}</h3>
                <span class="sermon-preacher">${sermon.preacher}</span>
                <span class="sermon-date">${sermon.date}</span>
                <div class="audio-controls">
                    <button class="play-btn" data-audio="${sermon.audioUrl}" data-title="${sermon.title}" data-preacher="${sermon.preacher}">
                        <i class="fas fa-play"></i> Play
                    </button>
                    <a href="${sermon.downloadUrl}" class="download-btn" download>
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            </div>
        `;
        
        sermonsContainer.appendChild(card);
        
        // Add visible class after a short delay to trigger animation
        setTimeout(() => {
            card.classList.add('visible');
        }, 50);
    });

    // Add event listeners to play buttons
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            playAudio(
                this.getAttribute('data-audio'),
                this.getAttribute('data-title'),
                this.getAttribute('data-preacher')
            );
        });
    });
}

// Play audio in modal
function playAudio(audioUrl, title, preacher) {
    currentAudio = audioUrl;
    audioPlayer.src = audioUrl;
    audioModalTitle.textContent = title;
    audioModalPreacher.textContent = preacher;
    downloadAudioBtn.href = audioUrl;
    audioModal.style.display = 'block';
    audioPlayer.play();
}

// Close audio modal
function closeAudioModal() {
    audioPlayer.pause();
    audioModal.style.display = 'none';
    currentAudio = null;
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
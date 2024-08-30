document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const progress = document.getElementById('progress');
    const currentTimeElem = document.getElementById('current-time');
    const totalTimeElem = document.getElementById('total-time');
    const cover = document.getElementById('cover');
    const songTitleElem = document.getElementById('song-title');
    const artistElem = document.getElementById('artist');

    let isPlaying = false;

    // Example songs
    const songs = [
        { src: 'Audio/Chuttamalle.mp3', cover: 'Images/devara.jpg', title: 'Chuttamalle', artist: ' Shilpa Rao' },
        { src: 'Audio/Nallanchu Thellacheera.mp3', cover: 'Images/Mr-Bachchan.jpg', title: 'Mr.Bachchan', artist: 'Sreerama Chandra, Sameera Bharadwaj' },
        { src: 'Audio/Water Packet.mp3', cover: 'Images/Raayan.jpg', title: 'Water Packet song', artist: 'Santhosh Narayanan, Shweta Mohan' },
        { src: 'Audio/Ullaasam.mp3', cover: 'Images/Saripodha-Sanivaaram.jpg', title: 'Saripodha-Sanivaaram ', artist: 'Sanjith Hegde, Krishna Lasya Muthyala' },
        { src: 'Audio/Oh Bangaram.mp3', cover: 'Images/Vinaro-Bhagyamu-Vishnu-Katha.jpg', title: 'Vinaro-Bhagyamu-Vishnu-Katha', artist: 'Kapil Kapilan' },
    ];

    let currentSongIndex = 0;

    function loadSong(index) {
        const song = songs[index];
        audio.src = song.src;
        cover.src = song.cover;
        songTitleElem.textContent = song.title;
        artistElem.textContent = song.artist;
    }

    function updateProgress() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;

        progress.value = (currentTime / duration) * 100;
        currentTimeElem.textContent = formatTime(currentTime);
        totalTimeElem.textContent = formatTime(duration);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    playButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playButton.textContent = '▶';
        } else {
            audio.play();
            playButton.textContent = '⏸';
        }
        isPlaying = !isPlaying;
    });

    prevButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    });

    nextButton.addEventListener('click', () => {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    });

    progress.addEventListener('input', () => {
        const value = progress.value;
        audio.currentTime = (value / 100) * audio.duration;
    });

    audio.addEventListener('timeupdate', updateProgress);

    loadSong(currentSongIndex);
});
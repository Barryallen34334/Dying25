document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');
    const bgMusic = document.getElementById('backgroundMusic');
    const buttonSound = document.getElementById('buttonSound');
    
    // Контрол музыки
    const musicControl = document.createElement('div');
    musicControl.className = 'music-control';
    musicControl.innerHTML = '<div class="music-icon">♫</div>';
    document.body.appendChild(musicControl);
    
    let isMusicPlaying = false;
    
    // Загрузка
    setTimeout(() => {
        // Завершаем прелоадер
        document.getElementById('preloaderProgress').style.width = '100%';
        document.getElementById('preloaderHint').textContent = 'Готово!';
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                mainContent.style.display = 'block';
                
                // Пробуем включить музыку
                tryPlayMusic();
            }, 500);
        }, 500);
    }, 3000);
    
    // Управление музыкой
    function tryPlayMusic() {
        bgMusic.volume = 0.3;
        bgMusic.play()
            .then(() => {
                isMusicPlaying = true;
                musicControl.innerHTML = '<div class="music-icon">♫</div>';
            })
            .catch(e => {
                console.log("Автовоспроизведение заблокировано");
                isMusicPlaying = false;
                musicControl.innerHTML = '<div class="music-icon">🔇</div>';
            });
    }
    
    musicControl.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicControl.innerHTML = '<div class="music-icon">🔇</div>';
        } else {
            bgMusic.play();
            musicControl.innerHTML = '<div class="music-icon">♫</div>';
        }
        isMusicPlaying = !isMusicPlaying;
        playButtonSound();
    });
    
    // Звук кнопок
    function playButtonSound() {
        buttonSound.currentTime = 0;
        buttonSound.volume = 0.3;
        buttonSound.play().catch(e => console.log(e));
    }
    
    // Назначаем звук на все кнопки
    document.querySelectorAll('.dying-button').forEach(btn => {
        btn.addEventListener('click', playButtonSound);
    });
});
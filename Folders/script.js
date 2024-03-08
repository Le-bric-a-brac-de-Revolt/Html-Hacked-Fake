var buttonClicked = false;

countdown();

function fullScreen() {
    // Mettre en plein écran
    var elem = document.documentElement;
         elem.requestFullscreen();
}
function stopHack() {
    if (!buttonClicked) {
        document.getElementById("hack-message").innerHTML = `
            <h1>Voulez-vous vraiment arrêter le piratage ?</h1>
            <button onclick="confirmStop()">Oui !</button>
        `;
        moveButton();
    }
}

function confirmStop() {
    buttonClicked = true;
    document.getElementById("hack-message").innerHTML = `
        <h1>Le piratage a été annulé</h1>
    `;
    document.exitFullscreen(); // Quitte le mode plein écran
}

function countdown() {
    var seconds = 15;
    var countdownElement = document.getElementById("countdown");
    var countdownInterval = setInterval(function() {
        seconds--;
        countdownElement.textContent = seconds;
        if (seconds <= 0 && !buttonClicked) {
            clearInterval(countdownInterval);
            moveButton();
            fullScreen();
        }
    }, 1000);
}

function moveButton() {
        fullScreen();
    var button = document.querySelector("button");
    button.style.position = "absolute";
    button.style.backgroundColor = "green"; // Change la couleur du bouton pour le rendre vert
    var maxX = window.innerWidth - button.offsetWidth;
    var maxY = window.innerHeight - button.offsetHeight;
    var minDistance = 130; // Distance minimale à partir de laquelle le bouton commence à "avoir peur"
    var lastButtonX, lastButtonY;

    // Fonction qui est appelée à chaque mouvement de la souris
    window.addEventListener("mousemove", function(event) {
        if (!buttonClicked) {
            var mouseX = event.clientX;
            var mouseY = event.clientY;
            var buttonRect = button.getBoundingClientRect();

            // Calcul de la distance entre la souris et le centre du bouton
            var distanceX = mouseX - (buttonRect.left + buttonRect.width / 2);
            var distanceY = mouseY - (buttonRect.top + buttonRect.height / 2);
            var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            if (distance < minDistance) {
                // Calcul de la nouvelle position du bouton en fonction de la position de la souris
                var newButtonX = buttonRect.left - distanceX / 20;
                var newButtonY = buttonRect.top - distanceY / 20;

                // Assure que le bouton reste dans les limites de l'écran
                newButtonX = Math.max(0, Math.min(maxX, newButtonX));
                newButtonY = Math.max(0, Math.min(maxY, newButtonY));

                // Vérifie si le bouton a changé de direction
                var directionX = newButtonX - (lastButtonX || newButtonX);
                var directionY = newButtonY - (lastButtonY || newButtonY);
                lastButtonX = newButtonX;
                lastButtonY = newButtonY;

                // Si le bouton atteint un bord de l'écran, apparaît du côté opposé
                if (newButtonX === 0 && directionX < 0) {
                    newButtonX = maxX - (buttonRect.width / 2);
                }
                if (newButtonX === maxX && directionX > 0) {
                    newButtonX = 0 + (buttonRect.width / 2);
                }
                if (newButtonY === 0 && directionY < 0) {
                    newButtonY = maxY - (buttonRect.height / 2);
                }
                if (newButtonY === maxY && directionY > 0) {
                    newButtonY = 0 + (buttonRect.height / 2);
                }

                // Calcul de la vitesse du bouton en fonction de la distance entre la souris et le bouton
                var speedFactor = 1;
                if (distance < 50) {
                    speedFactor = 2;
                }
                if (distance < 10) {
                    speedFactor = 4;
                }
                if (distance < 5) {
                    speedFactor = 8;
                }

                // Applique le facteur de vitesse au mouvement du bouton
                newButtonX -= distanceX / 20 * speedFactor;
                newButtonY -= distanceY / 20 * speedFactor;

                button.style.left = newButtonX + "px";
                button.style.top = newButtonY + "px";
            }

            // Change la couleur du fond lorsque la souris bouge
            var gradientColor = 'linear-gradient(to right, ';
            gradientColor += 'rgb(' + (Math.floor(Math.random() * 256)) + ',';
            gradientColor += (Math.floor(Math.random() * 256)) + ',';
            gradientColor += (Math.floor(Math.random() * 256)) + '),';
            gradientColor += 'rgb(' + (Math.floor(Math.random() * 256)) + ',';
            gradientColor += (Math.floor(Math.random() * 256)) + ',';
            gradientColor += (Math.floor(Math.random() * 256)) + ')';
            document.body.style.backgroundImage = gradientColor;
        }
    });
}

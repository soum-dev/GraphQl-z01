if (localStorage.getItem('Token')!==null) {
    window.location.href = './dashboard.html';
}
const form = document.querySelector("form"),
eField = form.querySelector(".email"),
    eInput = eField.querySelector("input"),
    pField = form.querySelector(".password"),
    pInput = pField.querySelector("input");

    form.onsubmit = async (e) => {
        e.preventDefault();
    
        // Assuming you have a function to validate the password on the server
        const passwordValidationResponse = await validatePasswordOnServer(eInput.value,pInput.value);
    
        if (passwordValidationResponse.error) {
            document.querySelector('.error-message').innerHTML = passwordValidationResponse.message;
            document.querySelector('.error-message').style.display='inline'
        } else {
            // Continue with your existing code for form submission
            if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
                window.location.href = form.getAttribute("action");
            }
        }
    }
    
    async function validatePasswordOnServer(username,password) {
        let verifValidation=await login(username,password)
        return new Promise(resolve => {
                if (!verifValidation) {
                    resolve({ error: true, message: "Password does not match." });
                }
        });
    }
    
    function encodeBase64(str) {
        // Utiliser TextEncoder pour obtenir un tableau d'octets
        var encoder = new TextEncoder();
        var byteArray = encoder.encode(str);
    
        // Convertir le tableau d'octets en chaîne base64
        var base64String = arrayBufferToBase64(byteArray);
    
        return base64String;
      }
    
      // Fonction pour convertir un tableau d'octets en chaîne base64
      function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
      }

async function login(username, password) {
    const auth = `Basic ${encodeBase64(`${username}:${password}`)}`;
    
    try {
        const response = await fetch("https://learn.zone01dakar.sn/api/auth/signin", {
            method: "POST",
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        // Handle the successful response here (e.g., return a parsed JSON or perform additional actions)
        const data = await response.json();
        localStorage.setItem('Token', data);
        console.log(data);
        RenderDashboard()
        return true;
    } catch (error) {
        console.error('Login failed:', error.message);

        return false;
        // Handle the error (e.g., show an error message to the user)
    }
}


function RenderDashboard(){
    window.location.href = "dashboard.html";
}

export default function logOut(){
    localStorage.clear()
    window.location.href='index.html'
}
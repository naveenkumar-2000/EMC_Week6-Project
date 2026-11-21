var form = document.getElementById("subscribeForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    var email = document.getElementById("email").value;
    
    form.style.display="none";
    document.getElementById("welcomeMsh").style.display="block";

});

// ---- Gallery uploads (kept in the browser only; lost on refresh) ----
const galleryGrid = document.getElementById('gallery-grid');
const uploadErr = document.getElementById('uploadErr');
const MAX_MB = 50;

document.getElementById('upload').addEventListener('change', e => {
  uploadErr.hidden = true;
  [...e.target.files].forEach(file => {
    const isImg = file.type.startsWith('image/'), isVid = file.type.startsWith('video/');
    if (!isImg && !isVid) { showErr(`"${file.name}" is not an image or video.`); return; }
    if (file.size > MAX_MB * 1024 * 1024) { showErr(`"${file.name}" is larger than ${MAX_MB} MB.`); return; }
    const url = URL.createObjectURL(file);
    const box = document.createElement('div');
    box.className = 'media';
    box.innerHTML = (isImg ? `<img src="${url}" alt="Customer upload">`
                           : `<video src="${url}" controls preload="metadata"></video>`)
                  + '<button aria-label="Remove">✕</button>';
    box.querySelector('button').onclick = () => { URL.revokeObjectURL(url); box.remove(); };
    galleryGrid.prepend(box);
  });
  e.target.value = '';
});

function showErr(msg) { uploadErr.textContent = msg; uploadErr.hidden = false; }
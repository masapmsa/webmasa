function openLightbox(imageSrc) {
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var downloadBtn = document.getElementById('download-btn');
  
    lightboxImg.src = imageSrc;
    downloadBtn.href = imageSrc; // Set download link
    lightbox.style.display = 'block';
    document.body.classList.add('lightbox-open');
  }
  
  function closeLightbox() {
    var lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.classList.remove('lightbox-open');
  }
  
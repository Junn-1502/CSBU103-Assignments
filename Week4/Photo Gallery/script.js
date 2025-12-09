const galleryImages = document.querySelectorAll('.gallery img');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.getElementById('close');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetBtn = document.getElementById('reset');

    let currentIndex = 0;
    let scale = 1;

    function showImage(index) {
      modal.style.display = 'flex';
      modalImg.src = galleryImages[index].src;
      currentIndex = index;
      scale = 1;
      modalImg.style.transform = `scale(${scale})`;
    }

    galleryImages.forEach((img, index) => {
      img.addEventListener('click', () => {
        showImage(index);
      });
    });

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showImage(currentIndex);
    });

    zoomInBtn.addEventListener('click', () => {
      scale += 0.1;
      modalImg.style.transform = `scale(${scale})`;
    });

    zoomOutBtn.addEventListener('click', () => {
      if (scale > 0.2) {
        scale -= 0.1;
        modalImg.style.transform = `scale(${scale})`;
      }
    });

    resetBtn.addEventListener('click', () => {
      scale = 1;
      modalImg.style.transform = `scale(${scale})`;
    });

    // Cho phép zoom bằng con lăn chuột
    modalImg.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        scale += 0.1;
      } else {
        if (scale > 0.2) scale -= 0.1;
      }
      modalImg.style.transform = `scale(${scale})`;
    });
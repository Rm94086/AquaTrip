(function () {
  "use strict";


  let rating = 0;
  let uploadedFiles = [];

  const STAR_LABELS = [
    "",
    "Péssimo 😞",
    "Ruim 😕",
    "Ok 😐",
    "Bom 😊",
    "Excelente! 🤩",
  ];

  const starsRow    = document.querySelector(".stars-row");
  const starBtns    = document.querySelectorAll(".stars-row button");
  const starLabel   = document.getElementById("star-label");
  const starError   = document.getElementById("star-error");

  const titleInput  = document.getElementById("review-title");
  const titleCount  = document.getElementById("title-count");
  const titleError  = document.getElementById("title-error");

  const textInput   = document.getElementById("review-text");
  const textCount   = document.getElementById("text-count");
  const textError   = document.getElementById("text-error");

  const uploadArea  = document.getElementById("upload-area");
  const fileInput   = document.getElementById("file-input");
  const previewList = document.getElementById("previews");

  const submitBtn   = document.getElementById("submit-btn");
  const successBanner = document.getElementById("success-banner");


  function paintStars(hoveredVal) {
    const val = hoveredVal !== undefined ? hoveredVal : rating;
    starBtns.forEach((btn, i) => {
      const path = btn.querySelector("path");
      path.className.baseVal = i < val ? "star-filled" : "star-empty";
    });
  }

  function setRating(val) {
    rating = val;
    paintStars();
    starLabel.textContent = STAR_LABELS[val];
    starError.style.display = "none";
  }

  starBtns.forEach((btn) => {
    btn.addEventListener("click", () => setRating(parseInt(btn.dataset.val)));
    btn.addEventListener("mouseenter", () => paintStars(parseInt(btn.dataset.val)));
    btn.addEventListener("mouseleave", () => paintStars());
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setRating(parseInt(btn.dataset.val));
      }
    });
  });


  titleInput.addEventListener("input", () => {
    titleCount.textContent = titleInput.value.length;
    if (titleInput.value.trim()) titleError.style.display = "none";
  });

  textInput.addEventListener("input", () => {
    textCount.textContent = textInput.value.length;
    if (textInput.value.trim()) textError.style.display = "none";
  });


  uploadArea.addEventListener("click", () => fileInput.click());

  uploadArea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      fileInput.click();
    }
  });

  uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.classList.add("active");
  });

  uploadArea.addEventListener("dragleave", () => {
    uploadArea.classList.remove("active");
  });

  uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.classList.remove("active");
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    addFiles(files);
  });

  fileInput.addEventListener("change", (e) => {
    addFiles(Array.from(e.target.files));
  });


  function addFiles(files) {
    const slots = 5 - uploadedFiles.length;
    files.slice(0, slots).forEach((file) => {
      if (uploadedFiles.length >= 5) return;
      uploadedFiles.push(file);
      const reader = new FileReader();
      reader.onload = (ev) => renderPreview(ev.target.result, uploadedFiles.length - 1);
      reader.readAsDataURL(file);
    });
  }

  function renderPreview(src, idx) {
    const li  = document.createElement("li");
    li.id     = "prev-" + idx;

    const img = document.createElement("img");
    img.src   = src;
    img.alt   = "Foto " + (idx + 1);

    const btn = document.createElement("button");
    btn.type  = "button";
    btn.textContent = "×";
    btn.setAttribute("aria-label", "Remover foto " + (idx + 1));
    btn.addEventListener("click", () => removeFile(idx));

    li.appendChild(img);
    li.appendChild(btn);
    previewList.appendChild(li);
  }

  function removeFile(idx) {
    uploadedFiles.splice(idx, 1);
    previewList.innerHTML = "";
    const temp = [...uploadedFiles];
    uploadedFiles = [];
    temp.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        uploadedFiles.push(file);
        renderPreview(ev.target.result, uploadedFiles.length - 1);
      };
      reader.readAsDataURL(file);
    });
  }


  function validate() {
    let ok = true;

    if (!rating) {
      starError.style.display = "block";
      ok = false;
    }

    if (!titleInput.value.trim()) {
      titleError.style.display = "block";
      ok = false;
    }

    if (!textInput.value.trim()) {
      textError.style.display = "block";
      ok = false;
    }

    return ok;
  }


  submitBtn.addEventListener("click", () => {
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    setTimeout(() => {
      submitBtn.style.display = "none";
      successBanner.removeAttribute("hidden");
      successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 1200);
  });

})();

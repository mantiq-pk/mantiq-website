
    const previews = document.querySelectorAll('.preview');
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) entry.target.style.setProperty('--preview-scale', entry.contentRect.width / 1200);
    });
    previews.forEach(preview => observer.observe(preview));

function rendererLinkElement(url, linkName) {
  return `<a href="${url}">${linkName}</a>`;
}

function rendererImageElement(url, alt) {
  return `<img src="${url}" alt="${alt}">`;
}

function rendererMediaElement(link, image) {
  return `
    <section class="media">
      ${rendererImageElement(image.url, image.alt)}
      ${rendererLinkElement(link.url, link.name)}
    </section>`;
}

export {
  rendererLinkElement,
  rendererImageElement,
  rendererMediaElement
};

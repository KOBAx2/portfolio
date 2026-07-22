export function appendExternalSvgIcons(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('a')

  links.forEach((link) => {
    // 既にSVGが挿入されている場合はスキップ（重複防止）
    if (link.querySelector('svg')) return

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('viewBox', '0 0 16 16')
    svg.setAttribute('width', '12')
    svg.setAttribute('height', '12')

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', 'M4 12L12 4M7 4H12V9')
    path.setAttribute('fill', 'none')
    path.setAttribute('stroke', 'currentColor')
    path.setAttribute('stroke-width', '2')

    svg.appendChild(path)
    link.appendChild(svg)
  })
}
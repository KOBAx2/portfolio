import { onMounted, onUnmounted, ref } from "vue"
import { gsap } from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { Observer } from "gsap/Observer"

gsap.registerPlugin(ScrollToPlugin, Observer)

export function useScroll(sectionSelector = ".section") {
  const currentIndex = ref(0)
  const isAnimating = ref(false)
  let observerInstance: Observer | null = null

  const goToSection = (index: number) => {
  if (isAnimating.value) return
  
  // DOM要素を取得
  const sections = gsap.utils.toArray<HTMLElement>(sectionSelector)
  const targetSection = sections[index]
  if (!targetSection) return

  isAnimating.value = true
  currentIndex.value = index

  // ★「対象セクションの中心」を「画面の中心」に合わせる計算
  const targetY =
    targetSection.offsetTop +
    targetSection.offsetHeight / 2 -
    window.innerHeight / 2

  gsap.to(window, {
    scrollTo: { y: targetY, autoKill: false },
    duration: 1,
    ease: "power2.inOut",
    onComplete: () => {
      isAnimating.value = false
    },
  })
}

  const getCardStep = (historyList: HTMLElement): number => {
    const firstCard = historyList.querySelector<HTMLElement>("li")
    if (!firstCard) return 300

    const cardWidth = firstCard.offsetWidth
    const gap = parseFloat(window.getComputedStyle(historyList).gap) || 0

    return cardWidth + gap
  }

  const animateHorizontalScroll = (
    historyList: HTMLElement,
    targetLeft: number,
  ) => {
    isAnimating.value = true

    gsap.to(historyList, {
      scrollLeft: targetLeft,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        isAnimating.value = false
      },
    })
  }

  onMounted(() => {
    const sections = gsap.utils.toArray<HTMLElement>(sectionSelector)

    observerInstance = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onUp: () => {
        if (isAnimating.value) return

        const currentSection = sections[currentIndex.value]
        const historyList =
          currentSection?.querySelector<HTMLElement>(".history-list")

        if (historyList && historyList.matches(":hover")) {
          const isAtEnd =
            historyList.scrollLeft + historyList.clientWidth >=
            historyList.scrollWidth - 2

          if (!isAtEnd) {
            const cardStep = getCardStep(historyList)
            const nextTarget =
              Math.floor((historyList.scrollLeft + cardStep + 10) / cardStep) *
              cardStep

            animateHorizontalScroll(historyList, nextTarget)
            return
          }
        }

        if (currentIndex.value < sections.length - 1) {
          goToSection(currentIndex.value + 1)
        }
      },

      onDown: () => {
        if (isAnimating.value) return

        const currentSection = sections[currentIndex.value]
        const historyList =
          currentSection?.querySelector<HTMLElement>(".history-list")

        if (historyList && historyList.matches(":hover")) {
          const isAtStart = historyList.scrollLeft <= 0

          if (!isAtStart) {
            const cardStep = getCardStep(historyList)
            const prevTarget =
              Math.ceil((historyList.scrollLeft - cardStep - 10) / cardStep) *
              cardStep

            animateHorizontalScroll(historyList, Math.max(0, prevTarget))
            return // 横スクロール処理を終えて離脱
          }
        }

        if (currentIndex.value > 0) {
          goToSection(currentIndex.value - 1)
        }
      },
      tolerance: 10,
      preventDefault: true,
    })
  })

  onUnmounted(() => {
    if (observerInstance) observerInstance.kill()
  })

  return {
    currentIndex,
  }
}

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);

  // Initialize Lenis
  const lenis = new Lenis();

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

//   initExpandingTiles();
});

const items = gsap.utils.toArray(".expanding-tile"),
        finalContainer = document.querySelector('.expansion-container');

let activeItem; // keeps track of which item is open (details)
// grab the original state
//   const state = Flip.getState('.expanding-tile', { props: 'backgroundColor, red'});

  // record some extra properties (optional)
//    const state = Flip.getState('.expanding-tile', { props: 'backgroundColor, red'});

   // make state changes. We'll toggle a class, for example:
    element.classList.toggle("full-screen");

    // animate from the previous state to the current one:
function doFlip(){
    const state = Flip.getState('.expanding-tile', { props: 'backgroundColor, red'});
}
Flip.from(state, {
  duration: 1,
  ease: "power1.inOut",
  absolute: true,
  onComplete: myFunc,
});

// function initExpandingTiles() {
//   const group = document.querySelector(".expanding-group");
//   const expansionContainer = document.querySelector(".expansion-container");
//   const tiles = group ? Array.from(group.querySelectorAll(".expanding-tile")) : [];

//   if (!group || !expansionContainer || !tiles.length) return;

//   // A fixed comment node marks each tile's original slot so it can be
//   // Flip-returned there later, even after other tiles have moved around it.
//   tiles.forEach((tile) => {
//     const homeAnchor = document.createComment("tile-home");
//     tile.after(homeAnchor);
//     tile._homeAnchor = homeAnchor;
//   });

//   let isAnimating = false;

//   tiles.forEach((tile) => {
//     const trigger = tile.querySelector(".tile-content");
//     trigger.addEventListener("click", () => handleTileClick(tile));
//   });

//   function flipTile(mutate) {
//     return new Promise((resolve) => {
//       const state = Flip.getState(tiles);
//       mutate();
//       Flip.from(state, {
//         duration: 0.6,
//         ease: "power3.inOut",
//         absolute: true,
//         onComplete: resolve,
//       });
//     });
//   }

//   function collapseContent(content) {
//     return new Promise((resolve) => {
//       gsap.to(content, {
//         height: 0,
//         opacity: 0,
//         y: -12,
//         overflow: "hidden",
//         duration: 0.3,
//         ease: "power2.in",
//         onComplete: () => {
//           content.classList.add("hidden");
//           gsap.set(content, { clearProps: "height,opacity,y,overflow" });
//           resolve();
//         },
//       });
//     });
//   }

//   function revealContent(content) {
//     return new Promise((resolve) => {
//       content.classList.remove("hidden");
//       gsap.fromTo(
//         content,
//         { height: 0, opacity: 0, y: -12, overflow: "hidden" },
//         {
//           height: "100%",
//           opacity: 1,
//           y: 0,
//           duration: 0.45,
//           ease: "power2.out",
//           delay: 0.1,
//           onComplete: () => {
//             gsap.set(content, { clearProps: "height,overflow" });
//             resolve();
//           },
//         }
//       );
//     });
//   }

//   async function openTile(tile) {
//     tile.classList.add("active");
//     await flipTile(() => expansionContainer.appendChild(tile));
//     await revealContent(tile.querySelector(".expanded-content"));
//   }

//   async function closeTile(tile) {
//     tile.classList.remove("active");
//     await collapseContent(tile.querySelector(".expanded-content"));
//     await flipTile(() => tile._homeAnchor.after(tile));
//   }

//   async function handleTileClick(tile) {
//     if (isAnimating) return;
//     isAnimating = true;

//     // Removing a tile from the flex flow briefly shrinks .expanding-group's
//     // height before the expanded content grows it back. That dip makes Lenis
//     // (and native scroll anchoring) reclamp scroll position mid-animation,
//     // producing a visible jump. Pin the height for the whole sequence so the
//     // page's scrollable footprint never shrinks below its current size.
//     group.style.minHeight = `${group.getBoundingClientRect().height}px`;

//     const wasActive = tile.classList.contains("active");
//     const otherActive = tiles.find((t) => t !== tile && t.classList.contains("active"));

//     if (otherActive) await closeTile(otherActive);

//     if (wasActive) {
//       await closeTile(tile);
//     } else {
//       await openTile(tile);
//     }

//     group.style.minHeight = "";
//     isAnimating = false;
//   }
// }
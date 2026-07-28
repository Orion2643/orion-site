import heroShipCutout from "@/assets/hero-ship-cutout.webp";
import { motion, EngineFlame } from "./motion";

/**
 * No mobile, em vez de um card estático com a foto da nave, a Orion
 * atravessa a tela periodicamente — como se fosse avistada passando de
 * relance. Imagem já recortada (fundo real removido, PNG/WebP com alpha),
 * sem caixa/borda. Ciclo de 5s: ~1.8s visível cruzando a tela, resto em
 * pausa até passar de novo.
 */
export function ShipFlyby() {
  return (
    <div
      aria-hidden
      className="relative mx-auto mt-10 h-48 w-full max-w-[38rem] overflow-hidden md:hidden"
    >
      <motion.div
        className="absolute w-[62%] max-w-[340px]"
        animate={{
          left: ["-50%", "-50%", "140%", "140%"],
          top: ["60%", "60%", "6%", "6%"],
          rotate: [0, -2, -2, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.07, 0.42, 0.5],
        }}
      >
        <EngineFlame top="92%" left="8%" size={48} angle={30} delay={0} />
        <EngineFlame top="74%" left="21%" size={42} angle={26} scale={0.9} delay={0.35} />
        <img
          src={heroShipCutout}
          alt="Nave futurista da Orion cruzando o espaço com as turbinas acesas"
          loading="eager"
          width={748}
          height={434}
          className="relative w-full drop-shadow-[0_10px_40px_rgba(56,189,248,0.35)]"
        />
      </motion.div>
    </div>
  );
}

function Pill({ children }) {
  return <span className="rounded-full bg-frost-300/10 px-2.5 py-1 text-[11px] font-medium text-frost-200">{children}</span>;
}

export default function ParsedRequirements({ criteria }) {
  const hasAny =
    criteria.biomes.length || criteria.structures.length || criteria.terrain.length || criteria.maxDistance || criteria.edition;

  return (
    <div className="glass rounded-xl px-4 py-3.5">
      <div className="flex items-center gap-2 text-xs font-medium text-white/40">
        <span>🧠</span> AI understood your request as
      </div>
      {hasAny ? (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {criteria.biomes.map((b) => <Pill key={b}>{b}</Pill>)}
          {criteria.terrain.map((t) => <Pill key={t}>{t}</Pill>)}
          {criteria.structures.map((s) => <Pill key={s}>{s}</Pill>)}
          {criteria.edition && <Pill>{criteria.edition} edition</Pill>}
          {criteria.maxDistance && <Pill>within {criteria.maxDistance} blocks</Pill>}
          {criteria.aesthetic && <Pill>aesthetic priority</Pill>}
        </div>
      ) : (
        <p className="mt-1.5 text-sm text-white/45">
          Couldn't pin down specifics — showing broadly popular matches instead. Try mentioning a biome, structure, or distance.
        </p>
      )}
    </div>
  );
}

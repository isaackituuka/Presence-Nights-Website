import Image from "next/image"
import { FadeIn } from "@/components/mobile/fade-in"
import { MobileFooter } from "@/components/mobile/mobile-footer"

type Leader = { name: string; role: string; photo: string }

const LEADERS: { team: string; color: string; people: Leader[] }[] = [
  {
    team: "Team Leader",
    color: "#E66839",
    people: [{ name: "Tim", role: "Team Leader", photo: "/gallery/IMG_111.JPG" }],
  },
  {
    team: "Operations",
    color: "#D85325",
    people: [
      { name: "Sam", role: "Programming & Operations", photo: "/gallery/IMG_4571.JPG" },
      { name: "Aaron", role: "Programming & Operations", photo: "/gallery/IMG_4572.JPG" },
      { name: "Daniel", role: "Finance", photo: "/gallery/PHOTO-2026-04-03-13-38-27.JPG" },
    ],
  },
  {
    team: "Discipleship & Community",
    color: "#A9C0BF",
    people: [
      { name: "David", role: "Outreach & Prayer", photo: "/gallery/IMG_4573.JPG" },
      { name: "Debbie", role: "Community & Culture", photo: "/gallery/IMG_4574.JPG" },
      { name: "Sarah Joseph", role: "Community & Culture", photo: "/gallery/IMG_4576.JPG" },
    ],
  },
  {
    team: "Production & Worship",
    color: "#A9C0BF",
    people: [
      { name: "Sadie", role: "Marketing & Communication", photo: "/gallery/IMG_4577.JPG" },
      { name: "Wonder & Theo Joshua", role: "Worship", photo: "/gallery/Untitled (Poster (US)) - 1.PNG" },
    ],
  },
]

function LeaderCard({ leader, eager = false }: { leader: Leader; eager?: boolean }) {
  return (
    <div className="mobile-touch group relative">
      <div
        className="relative aspect-square overflow-hidden rounded-2xl border border-[#FFFFED]/8"
        style={{ boxShadow: "0 14px 30px rgba(0,0,0,0.45)" }}
      >
        <Image
          src={leader.photo}
          alt={`${leader.name}, ${leader.role} on the Presence Nights leadership team`}
          fill
          sizes="(min-width: 640px) 50vw, 50vw"
          quality={72}
          loading={eager ? "eager" : "lazy"}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/60 via-transparent to-transparent" />
      </div>
      <div className="mt-3 px-1">
        <div
          className="text-[#FFFFED] font-semibold text-[16px] leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {leader.name}
        </div>
        <div
          className="mt-1 text-[#D85325] text-[12px] tracking-[0.22em] uppercase"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {leader.role}
        </div>
      </div>
    </div>
  )
}

export default function MobileLeadershipPage() {
  return (
    <main className="relative bg-[#000000] text-[#FFFFED] min-h-screen">
      {/* Hero */}
      <section
        className="relative px-5 pt-32 pb-10"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 8rem)" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(216,83,37,0.07),transparent_55%)]" />
        <div className="relative">
          <FadeIn static>
            <span
              className="text-[10px] tracking-[0.5em] uppercase text-[#D85325]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              07 — Leadership
            </span>
          </FadeIn>
          <FadeIn static delay={50}>
            <h1
              className="mt-5 font-bold text-[#FFFFED] leading-[0.98]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 11vw, 3.6rem)" }}
            >
              Our <span className="italic gradient-text-fire">leadership</span> team.
            </h1>
          </FadeIn>
          <FadeIn static delay={120}>
            <p
              className="mt-5 text-[#8A8280] text-[15px] leading-relaxed"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              We lead so others can encounter his presence.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Teams */}
      <div className="px-5 space-y-12 pb-12">
        {LEADERS.map((group, gi) => (
          <section key={group.team}>
            <FadeIn>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className="h-px flex-1"
                  style={{ background: `linear-gradient(to right, transparent, ${group.color})` }}
                />
                <span
                  className="text-[10px] tracking-[0.42em] uppercase whitespace-nowrap"
                  style={{ fontFamily: "var(--font-mono)", color: group.color }}
                >
                  {group.team}
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: `linear-gradient(to left, transparent, ${group.color})` }}
                />
              </div>
            </FadeIn>

            {/* The Team Leader (Tim) gets a single full-width card */}
            {group.people.length === 1 ? (
              <FadeIn delay={80}>
                <div className="max-w-[78%] mx-auto">
                  <LeaderCard leader={group.people[0]} eager={gi === 0} />
                </div>
              </FadeIn>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {group.people.map((leader, i) => (
                  <FadeIn key={leader.name} delay={60 + i * 60}>
                    <LeaderCard leader={leader} eager={gi === 0 && i < 2} />
                  </FadeIn>
                ))}
              </div>
            )}
          </section>
        ))}

        <FadeIn>
          <div className="mt-4 text-center px-2">
            <span
              className="text-[10px] tracking-[0.45em] uppercase text-[#D85325]/85"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              And many more —
            </span>
            <p
              className="mt-4 text-[16px] italic text-[#FFFFED]/80 leading-relaxed"
              style={{ fontFamily: "var(--font-display)" }}
            >
              We are more than just a leadership team. Alongside us are countless hosts, intercessors, worshipers, and friends who make every gathering possible.
              Together we host the presence of God and serve his generation. <span className="not-italic font-semibold gradient-text-brand">We are better together</span>.
            </p>
          </div>
        </FadeIn>
      </div>

      <MobileFooter />
    </main>
  )
}

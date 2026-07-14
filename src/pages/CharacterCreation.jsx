import './pages.css'

function CharacterCreation() {
  return (
    <div className="page character-creation-page">
      <h1>Create Your Hero</h1>
      
      <section className="intake-section">
        <h2>Guild Intake Briefing</h2>
        <div className="dialogue-box">
          <p>
            "Before we begin, understand this clearly: you are not here because of where you're from, when you're from, or whatever world you call home. You're here because you showed potential."
          </p>
          <p>
            "The Guild doesn't care if you're a knight, a hacker, a witch, a gunslinger, or something no one here has a name for yet. If you can survive, adapt, and make decisions under pressure, we can work with you. Our systems will let you build what you already are - close enough that it won't matter in the field."
          </p>
          <p>
            "We exist to monitor timelines in flux. When worlds drift, fracture, or start breaking their own rules, we step in. Sometimes that means investigation. Sometimes it means diplomacy. Sometimes it means violence. You'll decide which."
          </p>
          <p>
            "Here's the offer. For every successful assignment, compensation is placed into a private account under your name. You can leave the Guild at any time. When you do, the money goes with you. No debt. No ownership. No chains."
          </p>
          <p>
            "We don't recruit heroes because they're perfect. We recruit them because they're becoming something special. Right now, you're better than average—stronger, smarter, luckier than most of the people in your home reality. That's enough. The rest comes from surviving. You will be sent into a timeline with what you can carry. If you need money or gear, find it yourself. Just don't do anything to alter the timeline."
          </p>
          <p className="closing-line">
            "So. Welcome to the Multiverse Adventurers Guild. Your first job is waiting."
          </p>
        </div>
      </section>

      <section className="core-mechanic-section">
        <h2>Core Mechanic at a Glance</h2>
        <div className="mechanic-box">
          <h3>Basic Roll (BR)</h3>
          <ol>
            <li>Roll a d20</li>
            <li>Add: Stat + Skill + Talent or other Modifiers</li>
            <li>Compare the total to a Target Number (TN) set by the GM</li>
            <li>If your total meets or beats the TN, you succeed</li>
          </ol>
        </div>
      </section>

      <section className="character-creation-steps">
        <h2>Character Creation Process</h2>
        <p className="subtitle">Use this process during Session Zero to build your hero in about 15 minutes.</p>

        <div className="step">
          <h3>Step 1: Concept First</h3>
          <p>Think about the kind of hero you want to play. Any genre, any era, any setting is allowed in the Multiverse - cyborgs, cowgirls, witches, knights, superheroes, detectives, monks, and everything in between.</p>
        </div>

        <div className="step">
          <h3>Step 2: Choose an Archetype (Optional)</h3>
          <p>Pick the Archetype that best matches your concept. Archetypes give your character direction, style, a few suggested Talents, and ideas about your Hero's personality. You can change your Archetype early in the campaign as you get familiar with the system.</p>
        </div>

        <div className="step">
          <h3>Step 3: Choose a Species</h3>
          <p>Select a Species that fits your concept or the setting. Species give you flavor and descriptive traits. Basic options include: Giant, Troll, Orc, Human, Elf, Dwarf, and Halfling. You can also create Exotic species like Fairy.</p>
        </div>

        <div className="step">
          <h3>Step 4: Assign Your Stats</h3>
          <p className="instruction">Assign the following values: +3, +2, +1, 0, 0, -1</p>
          <ul className="stats-list">
            <li><strong>Strength (St):</strong> Represents melee attacks</li>
            <li><strong>Dexterity (Dx):</strong> Represents ranged attacks and controlling vehicles</li>
            <li><strong>Endurance (En):</strong> Represents physical grueling tasks, hit points, and stamina</li>
            <li><strong>Intuition (In):</strong> Gut feelings and drawing conclusions; affects Initiative</li>
            <li><strong>Education (Ed):</strong> What you've learned in life</li>
            <li><strong>Charisma (Ch):</strong> Your ability to use personality to influence others</li>
          </ul>
          <p className="instruction">"Pick your most important Stat and write in (+3). Now look at your least important stat. Write in a (-1). Pick your next most important stat. Write in a (+2). Of the three stats left, put a (+1) into the most important stat and (0)s in the remaining stats."</p>
        </div>

        <div className="step">
          <h3>Step 5: Assign Your Skills</h3>
          <p className="instruction">Assign: +2, +2, +1, +1, +1, 0, 0, -1</p>
          <ul className="skills-list">
            <li><strong>Attack (Str or Dex):</strong> Used for every attack or offensive Talent</li>
            <li><strong>Influence (Cha):</strong> Intimidate, persuade, interrogate, acting, impersonation</li>
            <li><strong>Knowledge (Edu):</strong> Learned topics, research, magic theory</li>
            <li><strong>Observation (Intuition):</strong> Noticing details, perception</li>
            <li><strong>Outdoors (Intuition):</strong> Tracking, survival, navigation</li>
            <li><strong>Sneak (Dex):</strong> Stealth, sleight of hand, infiltration, disguise, and acting</li>
            <li><strong>Technology (Edu):</strong> Hacking, medicine, devices, engineering, disable traps, Matrix search</li>
            <li><strong>Vehicle (Dex):</strong> Driving a car, piloting a starship, riding a horse</li>
          </ul>
        </div>

        <div className="step">
          <h3>Step 6: Determine Your Defenses</h3>
          <p className="instruction">Your defenses protect you from harm:</p>
          <ul className="defenses-list">
            <li><strong>AV (Armor Value):</strong> 11 + Defense bonus + (Armor × 2)</li>
            <li><strong>Athletics:</strong> Defense bonus + Str + Dex + End</li>
            <li><strong>Ego:</strong> Defense bonus + Intuition + Education + Charisma</li>
          </ul>
        </div>

        <div className="step">
          <h3>Step 7: Starting Abilities</h3>
          <ul>
            <li>1 Talent Slot</li>
            <li>10 + endurance HP</li>
            <li>Access to Force 1 Talents</li>
          </ul>
        </div>

        <div className="step">
          <h3>Step 8: Add Items (Optional)</h3>
          <p>Items explain why your Stats and Skills look the way they do. They don't change numbers; they describe your character.</p>
          <p><strong>Examples:</strong></p>
          <ul>
            <li>(+2) Strength - Giant Species</li>
            <li>(+1) Education - "Street-taught scavenger tech"</li>
            <li>(-1) Sneak - "Loud, heavy boots"</li>
          </ul>
        </div>

        <div className="step">
          <h3>Step 9: Choose Contacts (Optional)</h3>
          <p>You begin with 3 ± Charisma Contacts. Contacts are NPCs you know who can help you with:</p>
          <ul>
            <li>Information</li>
            <li>Equipment</li>
            <li>Favors</li>
          </ul>
          <p>You may choose some now and fill in others as you play.</p>
        </div>

        <div className="step">
          <h3>Step 10: Choose a Reputation</h3>
          <p>Reputation is what the Multiverse thinks it knows about you. It might be true… or not.</p>
          <p><strong>Examples:</strong></p>
          <ul>
            <li>"Dead-eye shot"</li>
            <li>"Arcane scholar"</li>
            <li>"Former corporate asset"</li>
            <li>"Lucky beyond reason"</li>
          </ul>
        </div>

        <div className="step">
          <h3>Step 11: Weapon Enhancements</h3>
          <p>You start with one Weapon Enhancement for Melee or Ranged:</p>
          
          <h4>Melee Weapons</h4>
          <table className="weapon-table">
            <thead>
              <tr>
                <th>Damage</th>
                <th>Type</th>
                <th>Special Rules</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>d4</td>
                <td>Unarmed</td>
                <td>Automatic conceal</td>
                <td>Martial arts, brawling</td>
              </tr>
              <tr>
                <td>d6</td>
                <td>Dagger</td>
                <td>Automatic conceal</td>
                <td>Weapon under 18" in length, dagger, switchblade, pistol whip</td>
              </tr>
              <tr>
                <td>d8</td>
                <td>Sword</td>
                <td>Conceal Observation 15S</td>
                <td>Weapon under 3', long sword, shortsword, axe, club</td>
              </tr>
              <tr>
                <td>d10</td>
                <td>Two-Handed Weapon</td>
                <td>No conceal, (-2) AV</td>
                <td>Staff, Halberd, Great Axe, Great Sword</td>
              </tr>
            </tbody>
          </table>

          <h4>Ranged Weapons</h4>
          <table className="weapon-table">
            <thead>
              <tr>
                <th>Damage</th>
                <th>Type</th>
                <th>Special Rules</th>
                <th>Examples</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>d4</td>
                <td>Pistol</td>
                <td>Automatic Conceal</td>
                <td>Revolver, handgun, sling, slingshot</td>
              </tr>
              <tr>
                <td>d6</td>
                <td>Submachine Gun</td>
                <td>Conceal Observation 15S</td>
                <td>Uzi, Ingram, bow, crossbow</td>
              </tr>
              <tr>
                <td>d8</td>
                <td>Assault Rifle</td>
                <td>Conceal Observation 12S</td>
                <td>AR15, AK47, shotgun, hunting rifle</td>
              </tr>
              <tr>
                <td>d10</td>
                <td>Long Gun</td>
                <td>No conceal, braced</td>
                <td>Sniper Rifle, Machine Gun</td>
              </tr>
            </tbody>
          </table>

          <h4>Special Configurations</h4>
          <ul>
            <li><strong>Two-Weapon Fighting (Melee):</strong> Fight with 2 d6 weapons for d8 damage, same special rules of a d8 weapon</li>
            <li><strong>Two-Weapon Fighting (Range):</strong> 2 d4 weapons for d6 damage, same special rules as a d6 weapon</li>
            <li><strong>Silencers:</strong> Increase concealability by one step. Damage decreases by one step. A pistol becomes d4-1.</li>
            <li><strong>Concealment:</strong> Add your Sneak skill to the TN for concealment. A Sneak skill of (+2) conceals an SMG on 17S.</li>
          </ul>
        </div>
      </section>

      <section className="target-numbers-section">
        <h2>Target Numbers (TN Ladder)</h2>
        <table className="tn-table">
          <thead>
            <tr>
              <th>Difficulty</th>
              <th>TN</th>
              <th>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Easy</td>
              <td>9</td>
              <td>Simple climb, calm crowd</td>
            </tr>
            <tr>
              <td>Standard</td>
              <td>11</td>
              <td>Pick lock, persuade guard</td>
            </tr>
            <tr>
              <td>Tricky</td>
              <td>13</td>
              <td>Cross narrow beam, tail suspect</td>
            </tr>
            <tr>
              <td>Hard</td>
              <td>15</td>
              <td>Hack secure system, leap rooftop</td>
            </tr>
            <tr>
              <td>Heroic</td>
              <td>17</td>
              <td>Pilot damaged ship, banish spirit</td>
            </tr>
            <tr>
              <td>Legendary</td>
              <td>19+</td>
              <td>Rewrite history, duel demigod</td>
            </tr>
          </tbody>
        </table>
        <p className="note">The GM may adjust TN up or down for great ideas, tools, or situational advantage.</p>
      </section>

      <section className="level-progression-section">
        <h2>Level Progression</h2>
        <p className="subtitle">Players gain 1 level for every 10 XP. You gain 3 XP per playing session.</p>

        <div className="tier">
          <h3>TIER I - Basic Training (Lv 0-3)</h3>
          <p className="tagline">"You've joined the Guild. You're raw, reckless, and ready to prove yourself."</p>
          <ul>
            <li><strong>Level 0:</strong> Access F1 Talents • 1 Talent Slot, 10HP</li>
            <li><strong>Level 1:</strong> 2 Talents, (Choose 1: +1 Attack / +1 Defense / +1 Talent), 16HP, 3 energy</li>
            <li><strong>Level 2:</strong> Access F2 Talents, 22HP, 6 energy</li>
            <li><strong>Level 3:</strong> +1 Talent, 28 HP, 9 energy</li>
          </ul>
        </div>

        <div className="tier">
          <h3>TIER II - Skilled Operative (Lv 4-6)</h3>
          <p className="tagline">"You've survived the first missions. Now you're trusted to act on your own initiative."</p>
          <ul>
            <li><strong>Level 4:</strong> +1 Talent Slot, (Choose 1: +1 Attack / +1 Defense / +1 Talent), 34HP, 12 energy</li>
            <li><strong>Level 5:</strong> Access F3 Talents, +1 Talent, 40 HP, 15 energy</li>
            <li><strong>Level 6:</strong> (Choose 1: +1 Attack / +1 Defense / +1 Talent), 46 HP, 18 energy</li>
          </ul>
        </div>

        <div className="tier">
          <h3>TIER III - Elite Agent (Lv 7-10)</h3>
          <p className="tagline">"You are a legend in motion — the Guild's finest. Timelines bend around your choices."</p>
          <ul>
            <li><strong>Level 7:</strong> Talent slot, +1 Talent, 52 HP, 21 Energy</li>
            <li><strong>Level 8:</strong> (Choose 1: +1 Attack / +1 Defense / +1 Talent), 58 HP, 24 Energy</li>
            <li><strong>Level 9:</strong> Access F4 Talents, +1 Talent, 64 HP, 27 Energy</li>
            <li><strong>Level 10:</strong> 70 HP, 30 Energy • Final Guild Rank</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default CharacterCreation

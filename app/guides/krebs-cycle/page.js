import ArticleSchema from "../../ArticleSchema";
import { sitePath } from "../../../lib/site";
import { pageMetadata } from "../../../lib/seo";
import GuideLayout from "../GuideLayout";

export const metadata = pageMetadata("/guides/krebs-cycle/", "Krebs cycle: eight steps, energy yield and recall questions | FlashLock", "Understand the eight steps of the Krebs cycle, its enzymes and energy yield, then check common mistakes with short recall questions.");

export default function Guide() { return <GuideLayout breadcrumbs={[{name:"Home",path:"/"},{name:"Guides",path:"/guides/"},{name:"Krebs cycle",path:"/guides/krebs-cycle/"}]}><article>
<ArticleSchema path="/guides/krebs-cycle/" headline="Krebs cycle: eight steps, energy yield and recall questions" description={metadata.description} author="FlashLock team" datePublished="2026-11-16" dateModified="2026-11-16" />
<h1>Krebs cycle: eight steps, energy yield and recall questions</h1>
<p>By the FlashLock team · Published <time dateTime="2026-11-16">16 November 2026</time> · Last reviewed 16 November 2026.</p>
<p><strong>Quick answer:</strong> the Krebs cycle, citric acid cycle and tricarboxylic acid (TCA) cycle are the same pathway. Each turn accepts one two-carbon acetyl group and produces 3 NADH, 1 FADH₂, 1 GTP (or ATP) and 2 CO₂. Most of its energy reaches ATP later, through oxidative phosphorylation.</p>
<h2>Understand the loop before memorising it</h2>
<p>In human and other eukaryotic cells, the cycle operates mainly in the mitochondrial matrix. The exception is succinate dehydrogenase: it sits in the inner mitochondrial membrane and is also complex II of the electron transport chain.</p>
<p>The two-carbon acetyl group of acetyl-CoA joins four-carbon oxaloacetate to make six-carbon citrate. Reactions remove two carbons as CO₂ and regenerate oxaloacetate, ready to accept another acetyl group. Think of oxaloacetate as the starting molecule that the loop rebuilds, not a product used up on every turn.</p>
<p>Pyruvate oxidation happens <em>before</em> this cycle: pyruvate becomes acetyl-CoA, producing NADH and CO₂ separately. Do not add those products to a question asking for the cycle alone.</p>
<h2>The eight steps, with enzymes and outputs</h2>
<p>Track the carbon count first, then mark where energy carriers form. The carbon numbers below describe the cycle intermediates, not the carbons in coenzyme A.</p>
<ol>
<li><strong>Citrate synthase:</strong> acetyl-CoA (two-carbon acetyl group) + oxaloacetate (4C) → citrate (6C). The carbon skeletons join and CoA is released. This starts the loop.</li>
<li><strong>Aconitase:</strong> citrate (6C) → isocitrate (6C), via cis-aconitate. Removing and adding water rearranges the molecule, positioning it for the next oxidation. No NADH or CO₂ is produced here.</li>
<li><strong>Isocitrate dehydrogenase:</strong> isocitrate (6C) → alpha-ketoglutarate (5C). Oxidation reduces NAD⁺ to <strong>NADH</strong>, and one carbon leaves as <strong>CO₂</strong>. Alpha-ketoglutarate is also written α-ketoglutarate.</li>
<li><strong>Alpha-ketoglutarate dehydrogenase complex:</strong> alpha-ketoglutarate (5C) → succinyl-CoA (4C succinyl group). Another oxidation and carbon loss produce <strong>NADH</strong> and <strong>CO₂</strong>; CoA joins the remaining group.</li>
<li><strong>Succinyl-CoA synthetase:</strong> succinyl-CoA (4C) → succinate (4C), releasing CoA. This energetically favourable conversion is coupled to substrate-level phosphorylation, producing <strong>GTP or ATP</strong>, depending on the enzyme isoform and tissue.</li>
<li><strong>Succinate dehydrogenase:</strong> succinate (4C) → fumarate (4C). Oxidation reduces enzyme-bound FAD; this is counted as <strong>one FADH₂</strong> in the usual yield summary. Electrons pass to ubiquinone in the respiratory chain.</li>
<li><strong>Fumarase:</strong> fumarate (4C) → malate (4C). Water is added across a double bond. This hydration step produces neither NADH nor ATP.</li>
<li><strong>Malate dehydrogenase:</strong> malate (4C) → oxaloacetate (4C). Oxidation produces the third <strong>NADH</strong> and regenerates the molecule needed for step one.</li>
</ol>
<h2>Count the yield without double-counting</h2>
<ul><li><strong>Per acetyl-CoA, one turn:</strong> 3 NADH, 1 FADH₂, 1 GTP (or ATP), 2 CO₂.</li><li><strong>Per glucose, two turns:</strong> 6 NADH, 2 FADH₂, 2 GTP (or ATP), 4 CO₂, assuming both glucose-derived acetyl-CoA molecules enter the cycle.</li></ul>
<p>Only the step-five GTP or ATP is made by substrate-level phosphorylation within the cycle. NADH and FADH₂ carry electrons onward; they are not ATP molecules. Glycolysis and pyruvate oxidation have their own yields and belong in separate rows when calculating total glucose metabolism.</p>
<p>The cycle does not directly consume molecular oxygen. In aerobic human metabolism, it depends indirectly on oxygen accepting electrons at the end of the electron transport chain, allowing oxidised cofactors to be regenerated. Without that recycling, sustained cycle activity cannot continue normally.</p>
<h2>Common mistakes to catch</h2>
<ul><li><strong>“All eight enzymes float in the matrix.”</strong> Remember the membrane-bound complex II exception.</li><li><strong>“The two incoming acetyl carbons immediately leave.”</strong> The two CO₂ released in the first turn are not the newly entering acetyl carbons. Overall carbon balance is not the same as tracing individual atoms.</li><li><strong>“FADH₂ forms wherever NADH does.”</strong> Mark NADH at steps 3, 4 and 8; FADH₂ at step 6.</li><li><strong>“One glucose means one turn.”</strong> Glycolysis supplies two pyruvates, leading to two acetyl-CoA molecules and two turns.</li></ul>
<h2>Close the guide and test yourself</h2>
<p>Answer aloud or on paper before opening each answer.</p>
<details><summary>What joins acetyl-CoA, and what is formed?</summary><p>Four-carbon oxaloacetate joins its two-carbon acetyl group to form six-carbon citrate.</p></details>
<details><summary>Which two steps release CO₂?</summary><p>Steps 3 and 4: isocitrate dehydrogenase and alpha-ketoglutarate dehydrogenase.</p></details>
<details><summary>Which enzyme links the cycle directly to the respiratory chain?</summary><p>Succinate dehydrogenase, also called complex II, in the inner mitochondrial membrane.</p></details>
<details><summary>What does step eight restore, and what else does it produce?</summary><p>Oxaloacetate is restored, and NADH is produced.</p></details>
<details><summary>What is the cycle-only yield for two acetyl-CoA molecules?</summary><p>6 NADH, 2 FADH₂, 2 GTP (or ATP) and 4 CO₂. Exclude pyruvate oxidation.</p></details>
<h2>Turn weak spots into short study prompts</h2>
<p>Draw the loop from memory, then check each missing intermediate or output against your course text. FlashLock on Android can put your own short recall cards before selected apps; keep pathway drawing for a longer study session. See <a href={sitePath("/guides/study-before-scrolling/")}>study before scrolling</a> or the <a href={sitePath("/guides/anatomy-active-recall/")}>active-recall guide for anatomy</a>. No study method guarantees exam results.</p>
<p>Sources checked 16 November 2026: <a href="https://openstax.org/books/biology-2e/pages/7-3-oxidation-of-pyruvate-and-the-citric-acid-cycle">OpenStax Biology 2e, section 7.3</a>; <a href="https://chem.libretexts.org/Bookshelves/Organic_Chemistry/Organic_Chemistry_(OpenStax)/29%3A_The_Organic_Chemistry_of_Metabolic_Pathways/29.07%3A_The_Citric_Acid_Cycle">OpenStax Organic Chemistry, 29.7</a>; <a href="https://bio.libretexts.org/Bookshelves/Biochemistry/Book%3A_Biochemistry_Free_For_All_(Ahern_Rajagopal_and_Tan)/06%3A_Metabolism/6.02%3A_Citric_Acid_Cycle__Related_Pathways">Ahern, Rajagopal and Tan, Biochemistry Free For All, 6.2</a>; <a href="https://bio.libretexts.org/Bookshelves/Biochemistry/Fundamentals_of_Biochemistry_(Jakubowski_and_Flatt)/02%3A_Unit_II-_Bioenergetics_and_Metabolism/16%3A_The_Citric_Acid_Cycle/16.02%3A__Reactions_of_the_Citric_Acid_Cycle">Jakubowski and Flatt, 16.2, succinate dehydrogenase section</a>. Use your course’s notation when it differs.</p>
</article></GuideLayout>; }

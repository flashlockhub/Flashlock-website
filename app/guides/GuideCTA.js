import { androidBetaUrl } from "../../lib/download";
import styles from "./guides.module.css";
export default function GuideCTA({ campaign }){return <div className={styles.cta}><a className="button primary" href={androidBetaUrl(campaign)}>Get FlashLock for Android</a><small>Android beta</small></div>}

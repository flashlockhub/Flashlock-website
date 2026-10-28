import { ANDROID_BETA_URL } from "../../lib/download";
import styles from "./guides.module.css";
export default function GuideCTA(){return <div className={styles.cta}><a className="button primary" href={ANDROID_BETA_URL}>Get FlashLock for Android</a><small>Android beta</small></div>}

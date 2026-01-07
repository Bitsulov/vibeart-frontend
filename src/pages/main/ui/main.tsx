import { Layout } from "widgets/layout";
import "./main.scss";
import img from "shared/icons/pivo.jpg";
import { useLoadPageStatus } from "entities/pageStats";
import { useTranslation } from "react-i18next";

export const Main = () => {
	const { t } = useTranslation();

	const isPageLoaded = useLoadPageStatus();

	return (
		<Layout pageStatus={isPageLoaded}>
			<main className="main">
				<section className="hero">
					<div className="hero-content">
						<h1>{t("mainPage.introTitle")}</h1>
						<p>{t("mainPage.introSubtitle")}</p>
						<div className="hero-buttons">
							<a href="/auth" className="btn primary">{t("mainPage.introButton")}</a>
						</div>
					</div>
				</section>
				<section className="steps">
					<h2>{t("mainPage.stepsTitle")}</h2>
					<div className="steps-container">
					<div className="step">
						<div className="icon">🎨</div>
						<h3>{t("mainPage.steps1Title")}</h3>
						<p>{t("mainPage.steps1Description")}</p>
					</div>
					<div className="step">
						<div className="icon">💡</div>
						<h3>{t("mainPage.steps2Title")}</h3>
						<p>{t("mainPage.steps2Description")}</p>
					</div>
					<div className="step">
						<div className="icon">🌍</div>
						<h3>{t("mainPage.steps3Title")}</h3>
						<p>{t("mainPage.steps3Description")}</p>
					</div>
					</div>
				</section>
				<section className="gallery">
					<h2>{t("mainPage.galleryTitle")}</h2>
					<div className="gallery-grid">
					<div className="gallery-item">
						<img src={img} alt="art1"></img>
						<div className="info">{t("mainPage.gallery1Title")}</div>
					</div>
					<div className="gallery-item">
						<img src={img} alt="art2"></img>
						<div className="info">{t("mainPage.gallery2Title")}</div>
					</div>
					<div className="gallery-item">
						<img src={img} alt="art3"></img>
						<div className="info">{t("mainPage.gallery3Title")}</div>
					</div>
					<div className="gallery-item">
						<img src={img} alt="art4"></img>
						<div className="info">{t("mainPage.gallery4Title")}</div>
					</div>
					<div className="gallery-item">
						<img src={img} alt="art5"></img>
						<div className="info">{t("mainPage.gallery5Title")}</div>
					</div>
					</div>
				</section>
				<section className="artists">
					<h2>{t("mainPage.artistsTitle")}</h2>
					<div className="artists-container">
					<div className="artist-card">
						<img src={img} alt="artist"></img>
						<h3>{t("mainPage.artist1Name")}</h3>
						<a href="/profile/1" className="btn small primary">{t("mainPage.artistsButton")}</a>
					</div>
					<div className="artist-card">
						<img src={img} alt="artist"></img>
						<h3>{t("mainPage.artist2Name")}</h3>
						<a href="/profile/2" className="btn small primary">{t("mainPage.artistsButton")}</a>
					</div>
					<div className="artist-card">
						<img src={img} alt="artist"></img>
						<h3>{t("mainPage.artist3Name")}</h3>
						<a href="/profile/3" className="btn small primary">{t("mainPage.artistsButton")}</a>
					</div>
					</div>
				</section>
				<section className="testimonials">
					<h2>{t("mainPage.testimonialsTitle")}</h2>
					<div className="testimonials-container">
					<div className="testimonial">
						<p>{t("mainPage.testimonial1Text")}</p>
						<div className="author">— {t("mainPage.testimonial1Author")}</div>
					</div>
					<div className="testimonial">
						<p>{t("mainPage.testimonial2Text")}</p>
						<div className="author">— {t("mainPage.testimonial2Author")}</div>
					</div>
					<div className="testimonial">
						<p>{t("mainPage.testimonial3Text")}</p>
						<div className="author">— {t("mainPage.testimonial3Author")}</div>
					</div>
					</div>
				</section>
				<section className="cta">
					<h2>{t("mainPage.ctaTitle")}</h2>
					<div className="cta-buttons">
						<a href="/about" className="btn primary">{t("mainPage.ctaButton")}</a>
					</div>
				</section>
			</main>
		</Layout>
	)
}

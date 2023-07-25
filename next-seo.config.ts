export default {
	title: "CatsApp",
	description: "Explore cats and have fun",
	openGraph: {
		type: "website",
		locale: "en_IE",
		url:
			process.env.NODE_ENV === "production"
				? process.env.NEXT_PUBLIC_SITE_URL
				: "http://localhost:3000",
		site_name: "CatsApp",
		images: [
			{
				url: `${process.env.NODE_ENV === "production"
						? process.env.NEXT_PUBLIC_SITE_URL
						: "http://localhost:3000"
					}/favicon/android-chrome-192x192.png`,
				width: 192,
				height: 192,
				alt: "Og Image Alt",
			},
		],
	},
};

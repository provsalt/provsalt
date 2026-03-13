import {useTranslation} from "react-i18next";

export const Blogs = () => {
  const {t} = useTranslation();
  return (
    <main>
      <h1 className="text-4xl">{t("blogs.title")}</h1>
      <p className="text-xl">{t("blogs.description")}</p>
    </main>
  )
}
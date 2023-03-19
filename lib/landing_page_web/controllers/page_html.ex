defmodule LandingPageWeb.PageHTML do
  use LandingPageWeb, :html

  import LandingPageWeb.PagesComponents.Skills

  embed_templates "page_html/*"
  embed_templates "../components/pages_components/**/*"
end

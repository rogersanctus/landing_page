defmodule LandingPageWeb.PageController do
  use LandingPageWeb, :controller

  def home(conn, _params) do
    # The home page is often custom made,
    # so skip the default app layout.
    render(conn, :main_page, layout: false)
  end
end

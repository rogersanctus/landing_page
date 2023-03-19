defmodule LandingPageWeb.PagesComponents.Skills do
  @moduledoc """
  Skills dedicated components
  """

  use Phoenix.Component

  attr :img_url, :string, required: true
  attr :item_name, :string, required: true
  def skill_item(assigns) do
    ~H"""
    <li class="flex flex-col items-center">
      <img class="w-20 h-20" phx-track-static src={@img_url} alt={"#{@item_name} logo"} />
      <span class="text-sm font-semibold"><%= @item_name %></span>
    </li>
    """
  end
end

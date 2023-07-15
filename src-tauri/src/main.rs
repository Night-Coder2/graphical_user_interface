// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use fss::{read_file, write_file, delete_dir};
use tauri::{CustomMenuItem, Menu, Submenu, SystemTray, SystemTrayMenu, SystemTrayEvent, SystemTrayMenuItem, WindowBuilder, WindowUrl, SystemTraySubmenu};
use tauri::Manager;


fn main() {

  let quit:CustomMenuItem = CustomMenuItem::new("quit".to_string(), "Quit");
  let close:CustomMenuItem = CustomMenuItem::new("close".to_string(), "Close");
  let submenu:Submenu = Submenu::new("File".to_string(), Menu::new().add_item(close).add_item(quit));
  let menu:Menu = Menu::new().add_item(CustomMenuItem::new("Hide", "hide")).add_submenu(submenu);

  let tray_hide :CustomMenuItem = CustomMenuItem::new("hide".to_string(), "Hide");
  let tray_show :CustomMenuItem = CustomMenuItem::new("show".to_string(), "Show");
  let tray_quit :CustomMenuItem = CustomMenuItem::new("quit".to_string(), "Quit");
  let tray_minecraft :CustomMenuItem = CustomMenuItem::new("minecraft".to_string(), "Minecraft");
  let tray_games:SystemTraySubmenu = SystemTraySubmenu::new("Games".to_string(), SystemTrayMenu::new().add_item(tray_minecraft));
  let tray_menu:SystemTrayMenu = SystemTrayMenu::new().add_item(tray_quit).add_item(tray_hide).add_item(tray_show).add_submenu(tray_games);

  tauri::Builder::default()
  .menu(menu)
  .system_tray(SystemTray::new().with_menu(tray_menu).with_tooltip("Tauri App"))
  .on_system_tray_event(|app, event| match event {
    SystemTrayEvent::LeftClick {
      position: _,
      size: _,
      ..
    } => {
      let window = app.get_window("main").unwrap();
      window.show().unwrap();
    }
    SystemTrayEvent::MenuItemClick { id, .. } => {
      match id.as_str() {
        "hide" => {
          let window = app.get_window("main").unwrap();
          window.hide().unwrap();
        }
        "show" => {
          let window = app.get_window("main").unwrap();
          window.show().unwrap();
        }
        _ => {}
      }
    }
    _ => {}
  })
  .build(tauri::generate_context!())
  .expect("error while building tauri application")
  .run(|_app_handle, event| match event {
    tauri::RunEvent::ExitRequested { api, .. } => {
      api.prevent_exit();
    }
    _ => {}
  });
}

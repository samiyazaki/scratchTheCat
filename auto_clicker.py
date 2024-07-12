import pyautogui
import time
import threading
import keyboard
import tkinter as tk
from tkinter import messagebox

stop_event = threading.Event()
click_thread = None

# Function to perform clicking
def auto_click(interval, button):
    while not stop_event.is_set():
        pyautogui.click(button=button)
        time.sleep(interval)

# Function to start the auto clicker in a separate thread
def start_auto_clicker(interval, button):
    global click_thread, stop_event
    stop_event.clear()
    click_thread = threading.Thread(target=auto_click, args=(interval, button))
    click_thread.start()
    messagebox.showinfo("Auto Clicker", "Auto clicker started. Press 'Right Shift' to stop it.")

# Function to stop the auto clicker
def stop_auto_clicker():
    stop_event.set()
    if click_thread is not None:
        click_thread.join()
    messagebox.showinfo("Auto Clicker", "Auto clicker stopped.")

# Function to initialize the GUI
def create_gui():
    root = tk.Tk()
    root.title("Auto Clicker")
    root.geometry("300x150")

    start_button = tk.Button(root, text="Start Auto Clicker", command=lambda: start_auto_clicker(interval, button))
    start_button.pack(pady=20)

    stop_button = tk.Button(root, text="Stop Auto Clicker", command=stop_auto_clicker)
    stop_button.pack(pady=20)

    root.mainloop()

# Customize the interval between clicks and mouse button to click
interval = 0.1  # Time between clicks in seconds
button = 'left'  # Button to click ('left', 'right', or 'middle')

print(f"Press 'Right Shift' to stop the auto clicker.")

# Listen for stop hotkey
keyboard.add_hotkey('right shift', stop_auto_clicker)

# Run the GUI
create_gui()

import pyautogui
import time

# Function to perform clicking
def auto_click(interval, button, duration):
    start_time = time.time()
    while time.time() - start_time < duration:
        pyautogui.click(button=button)
        time.sleep(interval)

# Customize the interval between clicks, mouse button to click, and duration
interval = 0.000000000000000000000001  # Time between clicks in seconds
button = 'left'  # Button to click ('left', 'right', or 'middle')
duration = 100  # Total duration to run the auto clicker in seconds

print(f"Starting auto clicker for {duration} seconds with an interval of {interval} seconds.")
print(f"Clicking {button} mouse button.")

auto_click(interval, button, duration)

print("Auto clicker finished.")


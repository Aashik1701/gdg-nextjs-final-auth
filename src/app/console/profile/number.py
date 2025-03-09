from PIL import Image, ImageDraw, ImageFont # type: ignore

# Constants
width_per_cell = 200  # 2 inches at 100 DPI
height_per_cell = 200  # 2 inches at 100 DPI
rows = 9
cols = 10
image_width = cols * width_per_cell
image_height = rows * height_per_cell
font_size = 48

# Create a new image with white background
image = Image.new('RGB', (image_width, image_height), 'white')
draw = ImageDraw.Draw(image)

# Load a font
try:
    font = ImageFont.truetype("arial.ttf", font_size)
except IOError:
    font = ImageFont.load_default()

# Draw the numbers in the grid
for i in range(rows):
    for j in range(cols):
        number = i * cols + j + 1
        if number > 90:
            break
        # Calculate the position
        text = str(number)
        text_width, text_height = draw.textsize(text, font=font)
        x = j * width_per_cell + (width_per_cell - text_width) / 2
        y = i * height_per_cell + (height_per_cell - text_height) / 2
        # Draw the rectangle
        draw.rectangle([j * width_per_cell, i * height_per_cell, (j + 1) * width_per_cell, (i + 1) * height_per_cell], outline='black')
        # Draw the number
        draw.text((x, y), text, fill='black', font=font)

# Save the image
image.save('numbers_grid.png')
print("Image saved as 'numbers_grid.png'")
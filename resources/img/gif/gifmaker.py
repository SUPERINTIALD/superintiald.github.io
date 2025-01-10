import pygame
import random
import math
from PIL import Image

# Initialize Pygame
pygame.init()

# Screen dimensions (1920x1080)
WIDTH, HEIGHT = 1920, 1080
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Dynamic Network Animation with Smooth Return")

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# Node and edge parameters
NUM_NODES = 240
MAX_DISTANCE = 100
RIGHT_MARGIN = WIDTH // 2  # Right side of the screen
CYCLE_TIME = 10 * 1000  # 10 seconds in milliseconds
RANDOM_LOOPS = 1  # Number of random loops before cyclic behavior

# GIF saving parameters
FRAMES = []
GIF_DURATION = 20 * 1000  # Save first 20 seconds
FRAME_INTERVAL = 1 / 60  # 30 FPS

# Node class
class Node:
    def __init__(self):
        self.start_x = random.randint(RIGHT_MARGIN - 150, WIDTH - 50)
        self.start_y = random.randint(50, HEIGHT - 50)
        self.current_x = self.start_x
        self.current_y = self.start_y
        self.vx = random.uniform(-4, 4)  # Random velocity for random movement
        self.vy = random.uniform(-4, 4)

    def update_position(self, time_in_cycle, current_loop):
        half_cycle = CYCLE_TIME // 2
        if current_loop < RANDOM_LOOPS:
            self.current_x += self.vx
            self.current_y += self.vy
            if self.current_x <= RIGHT_MARGIN + 200 or self.current_x >= WIDTH - 200:
                self.vx *= -1
            if self.current_y <= HEIGHT // 4 or self.current_y >= 3 * HEIGHT // 4:
                self.vy *= -1
        else:
            if time_in_cycle < half_cycle:
                self.current_x += self.vx
                self.current_y += self.vy
                if self.current_x <= RIGHT_MARGIN + 200 or self.current_x >= WIDTH - 200:
                    self.vx *= -1
                if self.current_y <= HEIGHT // 4 or self.current_y >= 3 * HEIGHT // 4:
                    self.vy *= -1
            else:
                progress = (time_in_cycle - half_cycle) / half_cycle
                self.current_x = (1 - progress) * self.current_x + progress * self.start_x
                self.current_y = (1 - progress) * self.current_y + progress * self.start_y

    def get_position(self):
        return self.current_x, self.current_y

# Initialize nodes
nodes = [Node() for _ in range(NUM_NODES)]

# Main loop
running = True
clock = pygame.time.Clock()
start_time = pygame.time.get_ticks()

while running:
    screen.fill(BLACK)

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Create a transparent surface for the triangles
    triangle_surface = pygame.Surface((WIDTH, HEIGHT), pygame.SRCALPHA)

    # Calculate current loop and time within the loop
    total_time = pygame.time.get_ticks() - start_time
    current_loop = total_time // CYCLE_TIME
    time_in_cycle = total_time % CYCLE_TIME

    # Update node positions
    positions = []
    for node in nodes:
        node.update_position(time_in_cycle, current_loop)
        positions.append(node.get_position())

    # Draw edges and detect triangles
    for i, (x1, y1) in enumerate(positions):
        for j, (x2, y2) in enumerate(positions):
            if i != j:
                distance_ij = math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
                if distance_ij < MAX_DISTANCE:
                    line_color = (50, random.randint(100, 255), 255)
                    pygame.draw.line(screen, line_color, (x1, y1), (x2, y2), 1)
                    for k, (x3, y3) in enumerate(positions):
                        if k != i and k != j:
                            distance_jk = math.sqrt((x2 - x3) ** 2 + (y2 - y3) ** 2)
                            distance_ki = math.sqrt((x3 - x1) ** 2 + (y3 - y1) ** 2)
                            if distance_jk < MAX_DISTANCE and distance_ki < MAX_DISTANCE:
                                triangle_color = (
                                    random.randint(50, 100),
                                    random.randint(100, 150),
                                    random.randint(200, 255),
                                    128,
                                )
                                pygame.draw.polygon(
                                    triangle_surface,
                                    triangle_color,
                                    [(x1, y1), (x2, y2), (x3, y3)],
                                )

    screen.blit(triangle_surface, (0, 0))

    # Save frames for GIF
    if total_time <= GIF_DURATION:
        frame_surface = pygame.Surface((WIDTH, HEIGHT))
        frame_surface.blit(screen, (0, 0))
        frame_data = pygame.image.tostring(frame_surface, "RGBA")
        image = Image.frombytes("RGBA", (WIDTH, HEIGHT), frame_data)
        FRAMES.append(image)

    # Draw nodes
    for x, y in positions:
        pygame.draw.circle(screen, WHITE, (int(x), int(y)), 4)

    # Update the display
    pygame.display.flip()
    clock.tick(120)  # 30 FPS

    if total_time > GIF_DURATION:
        running = False

# Save the frames as a GIF
FRAMES[0].save(
    "network_animation.gif",
    save_all=True,
    append_images=FRAMES[1:],
    duration=1000 // 120,  # 30 FPS
    loop=0,
)

pygame.quit()

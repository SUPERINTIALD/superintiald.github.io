import pygame
import random
import math
from PIL import Image

# Initialize Pygame
pygame.init()

# Screen dimensions (1920x1080)
WIDTH, HEIGHT = 1920, 1080
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Dynamic 3D Network Animation with Smooth Return")

# Colors
BLACK = (0, 0, 0)
WHITE = (255, 255, 255)

# 3D world boundaries (world coordinates centered at (0,0))
# WORLD_X_MIN, WORLD_X_MAX = -400, 400
# RIGHT_WORLD_X_MIN, RIGHT_WORLD_X_MAX = 0  , WIDTH   # x-values chosen so nodes appear on the right

# WORLD_Y_MIN, WORLD_Y_MAX = 0, HEIGHT
# WORLD_Z_MIN, WORLD_Z_MAX = 0, 100  # Keep z positive so they are in front of the camera
# New world boundaries for x so that after projection:
#   x = WORLD_X_MIN --> projected x ≈ 0
#   x = WORLD_X_MAX --> projected x ≈ WIDTH - 150
RIGHT_WORLD_X_MIN = -160
RIGHT_WORLD_X_MAX = WIDTH / 2 - 150

# For a centered vertical distribution:
WORLD_Y_MIN = -HEIGHT / 2 + 150
WORLD_Y_MAX = HEIGHT / 2 - 150

# And for depth, we keep z positive:
WORLD_Z_MIN = -200
WORLD_Z_MAX = 200

# Node and edge parameters
NUM_NODES = 250
MAX_DISTANCE = 130  # Maximum distance (in 3D space) to connect nodes
CYCLE_TIME = 10 * 1000  # 10 seconds in milliseconds
RANDOM_LOOPS = 1  # Number of random loops before cyclic behavior

# GIF saving parameters
FRAMES = []
GIF_DURATION = 20 * 1000  # Save first 20 seconds
FRAME_INTERVAL = 1 / 60  # 60 FPS target

# Focal length for perspective projection (adjust for depth effect)
FOCAL_LENGTH = 500

def project(x, y, z, width, height, focal_length=FOCAL_LENGTH):
    """
    Projects 3D coordinates (x, y, z) onto 2D screen coordinates.
    The world is assumed to be centered at (0,0) and the camera looks along +z.
    """
    factor = focal_length / (focal_length + z)
    x_proj = x * factor + width / 2
    y_proj = y * factor + height / 2
    return x_proj, y_proj, factor

# Node class in 3D
class Node:
    def __init__(self):
        # Start positions in the 3D world
        self.start_x = random.uniform(RIGHT_WORLD_X_MIN, RIGHT_WORLD_X_MAX)
        self.start_y = random.uniform(WORLD_Y_MIN, WORLD_Y_MAX)
        self.start_z = random.uniform(WORLD_Z_MIN, WORLD_Z_MAX)
        self.x = self.start_x
        self.y = self.start_y
        self.z = self.start_z

        # Random velocity for random movement
        self.vx = random.uniform(-4, 4)
        self.vy = random.uniform(-4, 4)
        self.vz = random.uniform(-2, 2)

    def update_position(self, time_in_cycle, current_loop):
        half_cycle = CYCLE_TIME // 2
        if current_loop < RANDOM_LOOPS:
            # Random movement with boundary bounces in 3D
            self.x += self.vx
            self.y += self.vy
            self.z += self.vz

            if self.x <= RIGHT_WORLD_X_MIN or self.x >= RIGHT_WORLD_X_MAX:
                self.vx *= -1
            if self.y <= WORLD_Y_MIN or self.y >= WORLD_Y_MAX:
                self.vy *= -1
            if self.z <= WORLD_Z_MIN or self.z >= WORLD_Z_MAX:
                self.vz *= -1
        else:
            if time_in_cycle < half_cycle:
                self.x += self.vx
                self.y += self.vy
                self.z += self.vz
                if self.x <= RIGHT_WORLD_X_MIN or self.x >= RIGHT_WORLD_X_MAX:
                    self.vx *= -1
                if self.y <= WORLD_Y_MIN or self.y >= WORLD_Y_MAX:
                    self.vy *= -1
                if self.z <= WORLD_Z_MIN or self.z >= WORLD_Z_MAX:
                    self.vz *= -1
            else:
                # Smooth return: interpolate each coordinate back to its starting position
                progress = (time_in_cycle - half_cycle) / half_cycle
                self.x = (1 - progress) * self.x + progress * self.start_x
                self.y = (1 - progress) * self.y + progress * self.start_y
                self.z = (1 - progress) * self.z + progress * self.start_z

    def get_position(self):
        return self.x, self.y, self.z

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

    # Update node positions and compute their projected 2D positions.
    positions3D = []
    positions2D = []
    factors = []  # Save projection factors (for scaling nodes, if desired)
    for node in nodes:
        node.update_position(time_in_cycle, current_loop)
        pos3d = node.get_position()
        positions3D.append(pos3d)
        x_proj, y_proj, factor = project(*pos3d, WIDTH, HEIGHT)
        positions2D.append((x_proj, y_proj))
        factors.append(factor)

    # Draw edges and detect triangles (using 3D distance)
    for i, (x1, y1, z1) in enumerate(positions3D):
        for j, (x2, y2, z2) in enumerate(positions3D):
            if i != j:
                distance_ij = math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2)
                if distance_ij < MAX_DISTANCE:
                    # Color can depend on depth or be random
                    line_color = (50, random.randint(100, 255), 255)
                    pygame.draw.line(screen, line_color, positions2D[i], positions2D[j], 1)
                    for k, (x3, y3, z3) in enumerate(positions3D):
                        if k != i and k != j:
                            distance_jk = math.sqrt((x2 - x3) ** 2 + (y2 - y3) ** 2 + (z2 - z3) ** 2)
                            distance_ki = math.sqrt((x3 - x1) ** 2 + (y3 - y1) ** 2 + (z3 - z1) ** 2)
                            if distance_jk < MAX_DISTANCE and distance_ki < MAX_DISTANCE:
                                triangle_color = random.choice([
                                    (0, 100, 0, 128),     # Dark Green
                                    (34, 139, 34, 128),   # Forest Green
                                    (0, 128, 0, 128),     # Green
                                    (0, 255, 0, 128),     # Lime
                                    (50, 205, 50, 128),   # Lime Green
                                    (144, 238, 144, 128), # Light Green
                                    (152, 251, 152, 128), # Pale Green
                                    (60, 179, 113, 128),  # Medium Sea Green
                                    (46, 139, 87, 128),   # Sea Green
                                    (32, 178, 170, 128),  # Light Sea Green
                                    (0, 255, 127, 128),   # Spring Green
                                    (0, 250, 154, 128),   # Medium Spring Green
                                    (127, 255, 0, 128),   # Chartreuse
                                    (124, 252, 0, 128),   # Lawn Green
                                    (173, 255, 47, 128),  # Green Yellow
                                    (255, 255, 255, 128), # White
                                    (50, 205, 50, 128),   # Lime Green
                                    (0, 128, 128, 128),   # Teal
                                    (0, 139, 139, 128),   # Dark Cyan
                                    (0, 255, 255, 128),   # Cyan
                                    (224, 255, 255, 128)  # Light Cyan
                                ])
                                pygame.draw.polygon(
                                    triangle_surface,
                                    triangle_color,
                                    [positions2D[i], positions2D[j], positions2D[k]],
                                )

    screen.blit(triangle_surface, (0, 0))

    # Save frames for GIF
    if total_time <= GIF_DURATION:
        frame_surface = pygame.Surface((WIDTH, HEIGHT))
        frame_surface.blit(screen, (0, 0))
        frame_data = pygame.image.tostring(frame_surface, "RGBA")
        image = Image.frombytes("RGBA", (WIDTH, HEIGHT), frame_data)
        FRAMES.append(image)

    # Draw nodes; scale their drawn size slightly with depth factor if desired
    for idx, (x, y) in enumerate(positions2D):
        # You can use the factor to vary the node size (closer nodes appear larger)
        radius = max(2, int(4 * factors[idx]))
        pygame.draw.circle(screen, WHITE, (int(x), int(y)), radius)

    # Update the display
    pygame.display.flip()
    clock.tick(60)  # 60 FPS

    if total_time > GIF_DURATION:
        running = False

# Save the frames as a GIF
if FRAMES:
    FRAMES[0].save(
        "network_animation_3d_G.gif",
        save_all=True,
        append_images=FRAMES[1:],
        duration=1000 // 60,  # 60 FPS
        loop=0,
    )

pygame.quit()

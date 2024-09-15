# my_app/custom_logging.py

import os
from datetime import datetime
from logging.handlers import TimedRotatingFileHandler

class DailyDateRotatingFileHandler(TimedRotatingFileHandler):
    def __init__(self, base_filename, *args, **kwargs):
        # Ensure the base_filename is a string path
        if not isinstance(base_filename, str):
            raise ValueError("base_filename must be a string")
        super().__init__(base_filename, *args, **kwargs)
        self.base_filename = base_filename

    def get_rotated_filename(self):
        # Get the current date in the desired format
        date_str = datetime.now().strftime('%d-%m-%Y')
        return os.path.join(os.path.dirname(self.base_filename), f'{date_str}_api.log')

    def emit(self, record):
        # Update the filename with the current date
        self.baseFilename = self.get_rotated_filename()
        super().emit(record)

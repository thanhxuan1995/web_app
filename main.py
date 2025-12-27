import re
import csv

class PARTITION:
    def __init__(self, file_path):
        self.file_path = file_path
        self.text_data = self.file_reading()
        
    def file_reading(self):
        """Read the entire log file."""
        with open(self.file_path, "r", encoding="utf-8") as file:
            return file.read()

    def partition_to_wide(self, output_csv=None):
        """
        Partition the log file and extract fields into wide table format.
        Returns a list of dictionaries or writes CSV.
        """
        # Regex to extract each log block
        pattern = re.compile(
            r"\*{20}LOG START\*{20}(.*?)\*{20}LOG END\*{22}",
            re.DOTALL
        )
        blocks = pattern.findall(self.text_data)
        print(f"Found {len(blocks)} log blocks.")

        results = []
        sequence = 0

        for block in blocks:
            block = block.strip()
            
            # Extract TestItem
            test_item_match = re.search(r"TestItem\s*:\s*(\S+)", block)
            if not test_item_match:
                continue
            test_item = test_item_match.group(1)
            sequence += 1

            # Extract fields
            def extract(pattern_str):
                m = re.search(pattern_str, block)
                return m.group(1) if m else ""

            row = {
                "Sequence": sequence,
                "TestItem": test_item,
                "Subitem": "Value",  # fixed as per your desired output
                "TestResult": extract(r"TestResult\s*:\s*(\S+)"),
                "USL": extract(r"USL:\s*(\S+)"),
                "LSL": extract(r"LSL:\s*(\S+)"),
                "Cycle Time": extract(r"Cycle Time:\s*([\d.]+)"),
                "Number of try": extract(r"Number of try:\s*(\d+)"),
                "Start Time": extract(r"Start Time:\s*(\S+)")
            }

            results.append(row)

        # Save to CSV if required
        if output_csv:
            with open(output_csv, "w", newline="", encoding="utf-8") as csvfile:
                fieldnames = ["Sequence","TestItem","Subitem","TestResult","USL","LSL","Cycle Time",
                              "Number of try","Start Time"]
                writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
                writer.writeheader()
                writer.writerows(results)

        return results


# Example usage
if __name__ == "__main__":
    parser = PARTITION(r"C:\Users\ntxuan\Downloads\example_lof_file.txt")
    records = parser.partition_to_wide(output_csv= "structured_logs.csv")


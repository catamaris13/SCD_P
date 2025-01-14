﻿using System.Diagnostics.Metrics;
using System.Net.Mail;
using System.Net;
using System.Windows.Forms.VisualStyles;

namespace CourierAppClient
{
    public partial class Form1 : Form
    {
        PackageService packageService;
        CourierService courierService;
        List<Package> packages;
        List<Courier> couriers;

        public Form1()
        {
            InitializeComponent();
            packageService = new PackageService();
            packageService.createConnection();

            courierService = new CourierService();
            courierService.createConnection();


            comboBoxStatus.Items.AddRange(new string[] { "NEW", "NEW", "PENDING", "SHIPPED", "DELIVERED", "CANCELLED" });
            comboBoxStatus.SelectedIndex = 0;

            LoadCouriers();
        }
        private void LoadCouriers()
        {
            try
            {
                couriers = packageService.getBusyCouriers();
                comboBoxCouriers.Items.Clear();
                comboBoxMail.Items.Clear();
                foreach (var courier in couriers)
                {
                    comboBoxCouriers.Items.Add(courier.name);
                    comboBoxMail.Items.Add(courier.email);
                }

                if (couriers.Count > 0)
                {
                    comboBoxCouriers.SelectedIndex = 0;
                    comboBoxMail.SelectedIndex = 0;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading the couriers: {ex.Message}", "Error");
            }
        }
        private void button1_Click(object sender, EventArgs e)
        {
            List<Package> packages = packageService.getPackages();
            listBox1.Items.Clear();
            foreach (Package package in packages)
            {
                listBox1.Items.Add($"ID: {package.id}, Courier: {(string.IsNullOrEmpty(package.courier?.name) ? "NAN" : package.courier.name)}");

            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            string selectedStatus = comboBoxStatus.SelectedItem.ToString();

            try
            {
                List<Package> filteredPackages = packageService.findPackagesByStatus(selectedStatus);
                listBox2.Items.Clear();

                foreach (var package in filteredPackages)
                {
                    listBox2.Items.Add($"ID: {package.id}, Address: {package.deliveryAddress}");
                }

                if (filteredPackages.Count == 0)
                {
                    MessageBox.Show("No packages with this status.", "Info");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading the packages: {ex.Message}", "Error");
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            if (comboBoxCouriers.SelectedItem == null)
            {
                MessageBox.Show("Select a courier from the list!", "Attention");
                return;
            }

            string selectedCourierName = comboBoxCouriers.SelectedItem.ToString();
            Courier selectedCourier = couriers.FirstOrDefault(c => c.name == selectedCourierName);

            if (selectedCourier == null)
            {
                MessageBox.Show("Selected courier not found!.", "Error");
                return;
            }

            try
            {
                List<Package> courierPackages = packageService.findPackagesByCourier(selectedCourier.id);
                listBox3.Items.Clear();

                foreach (var package in courierPackages)
                {
                    listBox3.Items.Add($"ID: {package.id}, Address: {package.deliveryAddress}");
                }

                if (courierPackages.Count == 0)
                {
                    MessageBox.Show("There are no packages for this courier ", "Info");
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error while loading the packages for this courier: {ex.Message}", "Error");
            }
        }


        private void button4_Click(object sender, EventArgs e)
        {
            List<Courier> busyCouriers = packageService.getBusyCouriers();
            listBox4.Items.Clear();
            foreach (Courier courier in busyCouriers)
            {
                listBox4.Items.Add($"ID: {courier.id}, Name: {courier.name}");
            }
        }

        private void button5_Click(object sender, EventArgs e)
        {
            List<Courier> couriers = courierService.getCouriers();
            listBox5.Items.Clear();
            foreach (Courier courier in couriers)
            {
                listBox5.Items.Add($"ID: {courier.id}, Name: {courier.name}");
            }
        }

        private void button6_Click(object sender, EventArgs e)
        {
            List<Courier> freeCouriers = packageService.getFreeCouriers(courierService.getCouriers());
            listBox6.Items.Clear();
            foreach (Courier courier in freeCouriers)
            {
                listBox6.Items.Add($"ID: {courier.id}, Name: {courier.name}");
            }
        }

        private void button7_Click(object sender, EventArgs e)
        {
            if (comboBoxMail.SelectedItem == null)
            {
                MessageBox.Show("Please select a courier!", "Attention");
                return;
            }

            try
            {
                // Obține emailul curierului selectat
                string recipientEmail = comboBoxMail.SelectedItem.ToString();

                // Setările SMTP
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("catamaris13@gmail.com", "joql erah demd ceop"),
                    EnableSsl = true
                };

                // Crearea mesajului
                string fromEmail = "catamaris13@gmail.com";
                string subject = "RocketShip Message";
                string body = textBox1.Text;

                MailMessage mailMessage = new MailMessage(fromEmail, recipientEmail)
                {
                    Subject = subject,
                    Body = body
                };

                // Trimiterea emailului
                smtpClient.Send(mailMessage);

                MessageBox.Show("Email sent successfully!");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error sending the message: {ex.Message}", "Error");
            }
        }

        private void tabPage1_Click(object sender, EventArgs e)
        {

        }

        private void label9_Click(object sender, EventArgs e)
        {

        }

        private void label11_Click(object sender, EventArgs e)
        {

        }

        private void button8_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrEmpty(textBox2.Text))
            {
                MessageBox.Show("Please enter a package ID!", "Attention");
                return;
            }

            if (!int.TryParse(textBox2.Text, out int packageId))
            {
                MessageBox.Show("Invalid package ID. Please enter a valid number.", "Error");
                return;
            }

            try
            {
                // Apelează metoda pentru a obține statusul pachetului
                var status = packageService.getPackageStatusById(packageId);

                if (status != null)
                {
                    textBox3.Text = status.ToString(); // Afișează statusul în textBox3
                }
                else
                {
                    MessageBox.Show($"No package found with ID {packageId}.", "Info");
                    textBox3.Text = string.Empty; // Golește textBox3 dacă nu există pachet
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error retrieving package status: {ex.Message}", "Error");
                textBox3.Text = string.Empty; // Golește textBox3 în caz de eroare
            }
        }


        private void textBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void textBox3_TextChanged(object sender, EventArgs e)
        {

        }
    }
}


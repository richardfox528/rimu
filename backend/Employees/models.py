from dateutil.relativedelta import relativedelta
from datetime import date
from django.db import models
from Accounts.models import User
from Companies.models import Company
from django.conf import settings


class Employee(models.Model):
    """Model representing an employee in the system.

    This model stores information about employees including their personal details,
    employment information, and department/subcategory assignments.

    Attributes:
        name (str): Employee's first name.
        surname (str): Employee's last name.
        employee_id (int): Unique identifier for the employee.
        email (str): Employee's email address.
        phone_number (str): Contact phone number.
        date_of_birth (Date): Employee's birth date.
        current_company (ForeignKey): Current employer.
        position (str): Current job position.
        start_date (Date): Start date at current company.
        end_date (Date, optional): End date at current company.
        department (str): Department within the company.
        subcategory (str): Specific role category within department.
        employment_history_id (int): ID of associated employment history record.
    """

    DEPARTMENT_CHOICES = [
        ("Direccion y Administracion General", "Dirección y Administración General"),
        ("Recursos Humanos", "Recursos Humanos"),
        ("Finanzas y Contabilidad", "Finanzas y Contabilidad"),
        ("Operaciones", "Operaciones"),
        ("Comercial y Ventas", "Comercial y Ventas"),
        ("Marketing y Publicidad", "Marketing y Publicidad"),
        ("Tecnologias de la Informacion", "Tecnologías de la Información (TI)"),
        ("Innovacion e Investigacion", "Innovación e Investigación"),
        ("Compras y Proveedores", "Compras y Proveedores"),
        ("Juridico y Cumplimiento", "Jurídico y Cumplimiento"),
        (
            "Responsabilidad Social y Sostenibilidad",
            "Responsabilidad Social y Sostenibilidad",
        ),
        ("Seguridad y Gestion de Riesgos", "Seguridad y Gestión de Riesgos"),
        ("Servicio al Cliente", "Servicio al Cliente"),
        ("Investigacion y Desarrollo", "Investigación y Desarrollo (I+D)"),
        ("Relaciones Institucionales", "Relaciones Institucionales"),
        ("Otros", "Otros"),
    ]

    SUBCATEGORY_CHOICES = {
        "Direccion y Administracion General": [
            ("Direccion General", "Dirección General (CEO, Gerencia General)"),
            ("Asesoria Legal", "Asesoría Legal"),
            ("Secretaria General", "Secretaría General"),
            ("Planeacion Estrategica", "Planeación Estratégica"),
        ],
        "Recursos Humanos": [
            ("Reclutamiento y Seleccion", "Reclutamiento y Selección"),
            ("Capacitacion y Desarrollo", "Capacitación y Desarrollo"),
            ("Gestion del Talento", "Gestión del Talento"),
            ("Nominas y Compensaciones", "Nóminas y Compensaciones"),
            ("Seguridad y Salud Ocupacional", "Seguridad y Salud Ocupacional"),
        ],
        "Finanzas y Contabilidad": [
            ("Contabilidad General", "Contabilidad General"),
            ("Control de Presupuesto", "Control de Presupuesto"),
            ("Tesoreria", "Tesorería"),
            ("Auditoria Interna", "Auditoría Interna"),
            ("Facturacion y Cobranza", "Facturación y Cobranza"),
            ("Planeacion Financiera", "Planeación Financiera"),
        ],
        "Operaciones": [
            ("Produccion", "Producción"),
            ("Gestion de Proyectos", "Gestión de Proyectos"),
            ("Logistica y Distribucion", "Logística y Distribución"),
            ("Mantenimiento", "Mantenimiento"),
            ("Calidad", "Calidad"),
        ],
        "Comercial y Ventas": [
            ("Ventas Nacionales", "Ventas Nacionales"),
            ("Ventas Internacionales", "Ventas Internacionales"),
            ("Atencion al Cliente", "Atención al Cliente"),
            ("Postventa", "Postventa"),
        ],
        "Marketing y Publicidad": [
            ("Marketing Digital", "Marketing Digital"),
            ("Investigacion de Mercados", "Investigación de Mercados"),
            ("Relaciones Publicas", "Relaciones Públicas"),
            ("Branding", "Branding"),
            ("Publicidad y Promociones", "Publicidad y Promociones"),
        ],
        "Tecnologias de la Informacion": [
            ("Desarrollo de Software", "Desarrollo de Software"),
            ("Soporte Tecnico", "Soporte Técnico"),
            ("Ciberseguridad", "Ciberseguridad"),
            ("Infraestructura TI", "Infraestructura TI"),
            ("Gestion de Datos", "Gestión de Datos"),
        ],
        "Innovacion e Investigacion": [
            ("Desarrollo de Nuevos Productos", "Desarrollo de Nuevos Productos"),
            ("Investigacion y Desarrollo", "Investigación y Desarrollo (I+D)"),
            ("Innovacion Tecnologica", "Innovación Tecnológica"),
        ],
        "Compras y Proveedores": [
            ("Adquisiciones", "Adquisiciones"),
            ("Gestion de Proveedores", "Gestión de Proveedores"),
            ("Control de Inventarios", "Control de Inventarios"),
        ],
        "Juridico y Cumplimiento": [
            ("Contratos y Litigios", "Contratos y Litigios"),
            ("Cumplimiento Normativo", "Cumplimiento Normativo"),
            ("Proteccion de Datos", "Protección de Datos"),
        ],
        "Responsabilidad Social y Sostenibilidad": [
            ("Proyectos Sociales", "Proyectos Sociales"),
            ("Gestion Ambiental", "Gestión Ambiental"),
            ("Impacto Social", "Impacto Social"),
        ],
        "Seguridad y Gestion de Riesgos": [
            ("Seguridad Fisica", "Seguridad Física"),
            ("Riesgos Laborales", "Gestión de Riesgos Laborales"),
            ("Planificacion de Emergencias", "Planificación de Emergencias"),
        ],
        "Servicio al Cliente": [
            ("Gestion de Reclamos", "Gestión de Reclamos"),
            ("Asistencia Tecnica", "Asistencia Técnica"),
            ("Soporte Multicanal", "Soporte Multicanal"),
        ],
        "Relaciones Institucionales": [
            ("Relaciones con Gobiernos", "Relaciones con Gobiernos"),
            ("Representacion Empresarial", "Representación Empresarial"),
            ("Asuntos Publicos", "Asuntos Públicos"),
        ],
        "Otros": [
            ("Otros", "Otros"),
        ],
    }

    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    employee_id = models.IntegerField(unique=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, db_index=True)
    date_of_birth = models.DateField()
    current_company = models.ForeignKey(Company, on_delete=models.CASCADE, default=1)
    position = models.CharField(max_length=100, default="Unknow")
    start_date = models.DateField(null=False, blank=False, default="2000-01-01")
    end_date = models.DateField(null=True, blank=True, default="2000-01-01")
    department = models.CharField(
        max_length=100, choices=DEPARTMENT_CHOICES, default="Otros"
    )
    subcategory = models.CharField(max_length=100, default="Otros")
    employment_history_id = models.IntegerField(null=True, blank=True, editable=False)

    def save(self, *args, **kwargs):
        """Save the employee record.

        This method handles the creation of associated employment history records
        when a new employee is created.

        Args:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.
        """
        if self.department in self.SUBCATEGORY_CHOICES:
            valid_subcategories = [
                choice[0] for choice in self.SUBCATEGORY_CHOICES[self.department]
            ]
            if self.subcategory not in valid_subcategories:
                self.subcategory = "Otros"
        is_new = self.pk is None
        super().save(*args, **kwargs)
        if is_new:
            employment_history = EmploymentHistory.objects.create(
                employee=self,
                company_name=self.current_company,
                position=self.position,
                start_date=self.start_date,
                end_date=self.end_date,
            )
            self.employment_history_id = employment_history.id
            Employee.objects.filter(pk=self.pk).update(
                employment_history_id=employment_history.id
            )

    def __str__(self):
        """Return a string representation of the employee.

        Returns:
            str: The employee's full name.
        """
        return f"{self.name} {self.surname}"


class EmploymentHistory(models.Model):
    """Template for storing employee work history."""

    employee = models.ForeignKey(
        Employee, on_delete=models.CASCADE, related_name="employment_history"
    )
    company_name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["-start_date"]
        verbose_name = "Employment History"
        verbose_name_plural = "Employment Histories"

    def __str__(self):
        return f"{self.employee.name} - {self.company_name} - {self.position}"

    def calculate_total_work_time(self):
        """Calculate the total work time for the employee.

        Returns:
            str: A formatted string representing the total duration of employment
                 (e.g., "2 years, 3 months, 15 days").
        """
        if self.end_date:
            end_date = self.end_date
        else:
            end_date = date.today()

        delta = relativedelta(end_date, self.start_date)
        years = delta.years
        months = delta.months
        days = delta.days

        total_work_time = []
        if years > 0:
            total_work_time.append(f"{years} años")
        if months > 0:
            total_work_time.append(f"{months} meses")
        if days > 0:
            total_work_time.append(f"{days} días")

        return ", ".join(total_work_time)

    def save(self, *args, **kwargs):
        """Save the employment history record.

        Updates the company name and calculates the total duration before saving.

        Args:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.
        """
        self.company_name = self.employee.current_company
        self.total_duration = self.calculate_total_work_time()
        super().save(*args, **kwargs)

    @classmethod
    def get_employee_history(cls, employee_id):
        """Get the employment history for a specific employee.

        Args:
            employee_id: The ID of the employee.

        Returns:
            QuerySet: A queryset of employment history records for the employee,
                     ordered by start date.
        """
        return cls.objects.filter(employee__employee_id=employee_id).order_by(
            "start_date"
        )

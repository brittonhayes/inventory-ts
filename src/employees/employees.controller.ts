import { Body, Controller, DefaultValuePipe, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma, Employee } from '@prisma/client';
import { CreateEmployeeDto, EmployeeResponse, UpdateEmployeeDto } from './employees.dto';
import { EmployeesService } from './employees.service';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created employee', type: EmployeeResponse })
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the employee', type: EmployeeResponse })
  async findById(@Param('id') id: string): Promise<Employee | null> {
    return this.employeesService.employee({ id });
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated employee', type: EmployeeResponse })
  async update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    return this.employeesService.updateEmployee({ where: { id }, data: updateEmployeeDto });
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted employee', type: EmployeeResponse })
  async delete(@Param('id') id: string): Promise<Employee> {
    return this.employeesService.deleteEmployee({ id });
  }

  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiOkResponse({ description: 'Returns the employees', type: [EmployeeResponse] })
  async list(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
  ): Promise<Employee[]> {
    return this.employeesService.employees({
      orderBy: { name: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}

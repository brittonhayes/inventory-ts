import { Body, Controller, DefaultValuePipe, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { CreateEmployeeDto, Employee, EmployeeResponse, UpdateEmployeeDto } from './dto/employees.dto';
import { EmployeesService } from './employees.service';

@ApiTags('employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOkResponse({ description: 'Returns the created employee', type: EmployeeResponse })
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.createEmployee(createEmployeeDto);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Returns the employee', type: EmployeeResponse })
  async findEmployeeById(@Param('id') id: string) {
    return this.employeesService.findEmployee(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Returns the updated employee', type: EmployeeResponse })
  async updateEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.updateEmployee(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Returns the deleted employee', type: EmployeeResponse })
  async deleteEmployee(@Param('id') id: string) {
    return this.employeesService.deleteEmployee(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'sort', required: false, enum: Prisma.SortOrder })
  @ApiOkResponse({ description: 'Returns the employees', type: Employee, isArray: true })
  async listEmployees(
    @Query('name') name?: string,
    @Query('sort', new DefaultValuePipe(Prisma.SortOrder.asc)) sort?: Prisma.SortOrder,
  ) {
    return this.employeesService.listEmployees({
      orderBy: { name: sort },
      where: {
        AND: [name ? { name: { mode: Prisma.QueryMode.insensitive, contains: name } } : {}],
      },
    });
  }
}

import { Test } from '@nestjs/testing'
import { TasksService } from './tasks.service'
import { TaskRepository } from './task.repository'
import {GetTasksFilterDto} from './dto/get-tasks-filter.dto'
import {User} from '../auth/user.entity'
import {TaskStatus} from './task-status.enum'

const mockUser = {
  username: 'test'
}

const mockTaskRepository = () => ({
  getTasks: jest.fn()
})


describe('TasksService', () => {
  let tasksService 
  let taskRepository

  beforeEach( async () => {
    const module = await Test.createTestingModule({
      providers: [TasksService, {
        provide: TaskRepository,
        useFactory: mockTaskRepository
      }]
    }).compile()

    tasksService = await module.get<TasksService>(TasksService)
    taskRepository = await module.get<TaskRepository>(TaskRepository)
  })

  describe('getTasks',  () => {
    it('gets all tasks from the repository', async () => {
      taskRepository.getTasks.mockResolvedValue('some value')
      expect(taskRepository.getTasks).not.toHaveBeenCalled()
      const filters: GetTasksFilterDto = {
        status: TaskStatus.DONE,
        search: 'test'
      }
      const result  = await tasksService.getTasks(filters, mockUser as User)
      expect(taskRepository.getTasks).toHaveBeenCalledWith(filters, mockUser)
      expect(result).toEqual('some value')
      
    })
  })
})

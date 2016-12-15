<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * techTasksByUsers
 */
class techTasksByUsers
{
    /**
     * @var int
     */
    private $id;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $tasksByTasksInUsers;

    /**
     * @var \AppBundle\Entity\techTasks
     */
    private $tasksByTasks;

    /**
     * @var \AppBundle\Entity\techUsers
     */
    private $usersByTasks;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->tasksByTasksInUsers = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add tasksByTasksInUsers
     *
     * @param \AppBundle\Entity\techTasks $tasksByTasksInUsers
     * @return techTasksByUsers
     */
    public function addTasksByTasksInUser(\AppBundle\Entity\techTasks $tasksByTasksInUsers)
    {
        $this->tasksByTasksInUsers[] = $tasksByTasksInUsers;

        return $this;
    }

    /**
     * Remove tasksByTasksInUsers
     *
     * @param \AppBundle\Entity\techTasks $tasksByTasksInUsers
     */
    public function removeTasksByTasksInUser(\AppBundle\Entity\techTasks $tasksByTasksInUsers)
    {
        $this->tasksByTasksInUsers->removeElement($tasksByTasksInUsers);
    }

    /**
     * Get tasksByTasksInUsers
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTasksByTasksInUsers()
    {
        return $this->tasksByTasksInUsers;
    }

    /**
     * Set tasksByTasks
     *
     * @param \AppBundle\Entity\techTasks $tasksByTasks
     * @return techTasksByUsers
     */
    public function setTasksByTasks(\AppBundle\Entity\techTasks $tasksByTasks = null)
    {
        $this->tasksByTasks = $tasksByTasks;

        return $this;
    }

    /**
     * Get tasksByTasks
     *
     * @return \AppBundle\Entity\techTasks 
     */
    public function getTasksByTasks()
    {
        return $this->tasksByTasks;
    }

    /**
     * Set usersByTasks
     *
     * @param \AppBundle\Entity\techUsers $usersByTasks
     * @return techTasksByUsers
     */
    public function setUsersByTasks(\AppBundle\Entity\techUsers $usersByTasks = null)
    {
        $this->usersByTasks = $usersByTasks;

        return $this;
    }

    /**
     * Get usersByTasks
     *
     * @return \AppBundle\Entity\techUsers 
     */
    public function getUsersByTasks()
    {
        return $this->usersByTasks;
    }

    /**
     * Set tasksByTasksInUsers
     *
     * @param \AppBundle\Entity\techTasks $tasksByTasksInUsers
     * @return techTasksByUsers
     */
    public function setTasksByTasksInUsers(\AppBundle\Entity\techTasks $tasksByTasksInUsers = null)
    {
        $this->tasksByTasksInUsers = $tasksByTasksInUsers;

        return $this;
    }
}
